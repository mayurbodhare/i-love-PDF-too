# iLovePDF Clone - Document Management Web Application

This project is a web application inspired by iLovePDF, providing users with various document management features such as file conversion, compression, merging, splitting, and more. Built with modern web technologies, the app ensures a seamless and efficient user experience.

## Features

- **File Conversion**: Convert files between PDF, Word, Excel, and more.
- **File Compression**: Reduce file size without compromising quality.
- **Merge & Split PDFs**: Combine multiple PDFs or split them into smaller files.
- **Password Management**: Add or remove passwords from PDF files.
- **OCR Support**: Extract text from scanned PDFs using OCR.
- **Page Organization**: Rearrange, rotate, or delete pages within a PDF.
- **User Authentication**: Secure login and registration system.

## Technology Stack

### Frontend
- **Framework**: [Next.js](https://nextjs.org/) (React-based framework for SSR and SEO)
- **Styling**: Tailwind CSS for responsive and modern UI
- **State Management**: Context API (or Redux Toolkit for advanced needs)

### Backend
- **Framework**: Next.js API routes (for server-side logic)
- **Libraries**: 
  - pdf-lib for PDF manipulation
  - Tesseract.js for OCR
- **Authentication**: JSON Web Tokens (JWT)

### Database
- **Database**: PostgreSQL (via Prisma ORM)

### Storage
- **Cloud Storage**: AWS S3 (for file uploads and downloads)

### Deployment
- **Frontend & Backend**: Vercel
- **Database**: Hosted PostgreSQL (e.g., AWS RDS, Supabase)
- **CDN**: Cloudflare for faster file delivery

## Installation

### Prerequisites
- Node.js (>= 16.x)
- PostgreSQL (or a cloud-hosted database)
- AWS S3 account for file storage

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/mayurbodhare/i-love-PDF-too.git
   cd i-love-PDF-too
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Create a `.env` file in the root directory.
   - Add the following:
     ```env
     DATABASE_URL=your_postgresql_connection_string
     JWT_SECRET=your_secret_key
     AWS_ACCESS_KEY_ID=your_aws_access_key
     AWS_SECRET_ACCESS_KEY=your_aws_secret_key
     AWS_BUCKET_NAME=your_s3_bucket_name
     ```

4. Initialize Prisma:
   ```bash
   npx prisma generate
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open the app in your browser:
   ```
   http://localhost:3000
   ```

## Project Structure

```plaintext
├── public/            # Static files
├── src/
│   ├── components/    # Reusable UI components
│   ├── pages/         # Next.js pages
│   │   ├── api/       # API routes (backend logic)
│   │   └── auth/      # Authentication pages
│   ├── styles/        # Global and component-specific styles
│   ├── utils/         # Helper functions
│   └── prisma/        # Prisma schema and client
├── prisma/
│   ├── schema.prisma  # Prisma database schema
├── .env               # Environment variables
├── package.json       # Project metadata and dependencies
└── README.md          # Project documentation
```

## Key Features and Implementation

### 1. File Upload and Processing
- File uploads are stored in AWS S3.
- Processing is handled server-side using pdf-lib for manipulation and Tesseract.js for OCR.

### 2. Authentication
- Users can register, log in, and manage their sessions securely using JWT.
- API routes are protected using middleware.

### 3. Responsive UI
- Designed with Tailwind CSS for a clean and mobile-friendly interface.

### 4. Database Integration
- PostgreSQL stores user data, usage statistics, and processing history.
- Prisma ORM simplifies database queries.

## Roadmap

### Phase 1: Core Features
- File conversion, merging, splitting
- Basic authentication

### Phase 2: Advanced Features
- OCR support
- File compression
- Password management

### Phase 3: Enhancements
- Real-time collaboration
- AI-based document suggestions

## Contributing

Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

---

### Contact

For questions or feedback, reach out at:
- **Email**: mrbodhre7@gmail.com
- **GitHub**: [Mayur Bodhare](https://github.com/mayurbodhare)
