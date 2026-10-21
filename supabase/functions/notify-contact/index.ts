// Edge function: emails the owner when a contact quest row is inserted.
// Setup (after the keys exist):
//   supabase secrets set RESEND_API_KEY=... NOTIFY_TO=you@example.com NOTIFY_FROM=quests@yourdomain.com
//   supabase functions deploy notify-contact
//   Dashboard -> Database -> Webhooks: table contact_quests, event INSERT, target this function.

type ContactQuestRecord = {
    name: string;
    company: string;
    email: string;
    message: string;
};

Deno.serve(async (request: Request) => {
    const payload = await request.json();
    const record = payload.record as ContactQuestRecord | undefined;
    if (!record) return new Response("no record", { status: 400 });

    const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${Deno.env.get("RESEND_API_KEY")}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            from: Deno.env.get("NOTIFY_FROM"),
            to: Deno.env.get("NOTIFY_TO"),
            reply_to: record.email,
            subject: `New contact quest from ${record.name} (${record.company || "no company"})`,
            text: `${record.message}\n\n— ${record.name} <${record.email}>`,
        }),
    });

    return new Response(await response.text(), { status: response.status });
});
