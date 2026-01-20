import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT ? Number(process.env.PORT) : 3000;

const age = new Date().getFullYear() - new Date("2001-03-29").getFullYear();

app.get("/", (_req, res) => {
    res.status(200).json({
        message:
            "Welcome to my portfolio API, click here to view more about me http://localhost:3000/about",
    });
});

app.get("/about", (_req, res) => {
    res.status(200).json({
        title: "About me",
        name: "Niki Buela",
        age,
        contact: {
            email: "https://mailto:buelaniki@gmail.com",
            whatsapp: "https://wa.me/+59898121505",
        },
        location: {
            city: "Piriápolis",
            region: "Maldonado",
            country: "Uruguay",
            zip: "20200",
        },
        social: {
            github: "https://github.com/nikuzoko",
            linkedin: "https://www.linkedin.com/in/niki-buela/",
            instagram: "https://www.instagram.com/nikuzoko",
        },
        projects: [
            {
                name: "Faro",
                description:
                    "Landing page for a construction company with a paginated scroll",
                link: "https://faro.net.uy",
            },
            {
                name: "Plantasia",
                description:
                    "E-commerce platform for a plant shop with a shopping cart and a checkout process",
                link: "https://plantasia-shop.vercel.app",
            },
            {
                name: "Hackflix",
                description:
                    "Movie catalog platform with a search functionality and an infinite scroll",
                link: "https://nikuzomovies.vercel.app",
            },
        ],
        links: {
            home: "http://localhost:3000",
            about: "http://localhost:3000/about",
            health: "http://localhost:3000/health",
        },
    });
});

app.get("/health", (_req, res) => {
    res.status(200).json({ message: "API is running" });
});

app.listen(port, () => {
    console.log(`API listening on http://localhost:${port}`);
});
