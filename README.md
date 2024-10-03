<h1 align="center">Fullstack Order Store Grab</h1>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.0.0-blue" alt="React Version" />
  <img src="https://img.shields.io/badge/Vite-2.7.0-brightgreen" alt="Vite Version" />
  <img src="https://img.shields.io/badge/TailwindCSS-Integrated-06B6D4" alt="TailwindCSS Integration" />
  <img src="https://img.shields.io/badge/SpringBoot-2.5.4-brightgreen" alt="Spring Boot Version" />
  <img src="https://img.shields.io/badge/Kafka-Integrated-blue" alt="Kafka Integration" />
  <img src="https://img.shields.io/badge/MongoDB-Database-green" alt="MongoDB Integration" />
  <img src="https://img.shields.io/badge/PostgreSQL-Database-blue" alt="PostgreSQL Integration" />
</p>

<p align="center">
  <img src="https://skillicons.dev/icons?i=react,vite,tailwind,spring,mongodb,postgres,kafka" alt="Tech Stack Icons" />
</p>

## Overview

This project involves the development of an **order store system** using **OLTP**, **OLAP**, and **Kafka technologies**, with a case study on **Grab orders**. The goal is to efficiently store and process millions of orders daily. For more details, you can refer to this [link](https://engineering.grab.com/how-we-store-millions-orders).

## Features

- OLTP and OLAP architectures for effective data processing
- Integration with **Kafka** for real-time event streaming
- User-friendly interface built with **React**, **Vite**, and **Tailwind CSS**
- Support for multiple databases: **MongoDB** and **PostgreSQL**
- Clean architecture and codebase for maintainability

## Tech Stack

- **Frontend:**
  - **React** with **Vite** and **TypeScript**
  - **Tailwind CSS** and **ShadCN UI** for styling
- **Backend:**
  - **Spring Boot** for REST API development
  - **Kafka** for messaging and event processing
  - **MongoDB** and **PostgreSQL** for data storage

## Project Structure

```bash
fullstack-order-store-grab/
│
├── fullstack-grab-reacts/               # Frontend application
│   ├── src/                              # Source code for React app
│   ├── public/                           # Static assets
│   └── vite.config.js                    # Vite configuration
│
└── fullstack-grab-springboot/           # Backend application
    ├── src/
    │   ├── main/
    │   │   ├── java/
    │   │   │   └── com/grab/            # Source code and main application
    │   └── resources/
    │       ├── application.properties    # Configuration for databases and Kafka
    └── pom.xml                           # Project dependencies

```

## Setup & Installation

---

- **Clone the repository**

    ```bash
    git clone https://github.com/mochrks/fullstack-order-store-grab.git
    cd fullstack-order-store-grab
    ```

- **Setup Frontend**

    1. Navigate to the frontend directory:

    ```bash
    cd fullstack-grab-reacts
    ```

    2. Install dependencies:

    ```bash
    npm install
    ```

    3. Run the development server:

    ```bash
    npm run dev
    ```

- **Setup Backend**

    1. Navigate to the backend directory:

    ```bash
    cd fullstack-grab-springboot
    ```

    2. Install dependencies:

    ```bash
    mvn clean install
    ```

    3. Run the application:

    ```bash
    mvn spring-boot:run
    ```

- The backend application will be running on [http://localhost:8080](http://localhost:8080), and the frontend application will be running on [http://localhost:3000](http://localhost:{port).

\## Connect with me:
[![GitHub](https://img.shields.io/badge/GitHub-333?style=for-the-badge&logo=github&logoColor=white)](https://github.com/mochrks)
[![YouTube](https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white)](https://youtube.com/@Gdvisuel)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://instagram.com/mochrks)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/mochrks)
[![Behance](https://img.shields.io/badge/Behance-1769FF?style=for-the-badge&logo=behance&logoColor=white)](https://behance.net/mochrks)
[![Dribbble](https://img.shields.io/badge/Dribbble-EA4C89?style=for-the-badge&logo=dribbble&logoColor=white)](https://dribbble.com/mochrks)

