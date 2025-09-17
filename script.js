const myCVData = {
    bio: "I am a passionate Cloud Support Engineer with 4 years of experience in AWS Cloud. Results-driven Cloud Engineer with a strong background in AWS solutions and cloud infrastructure automation. Experienced in managing complex infrastructure projects, delivering customized solutions, and ensuring architectural compliance. Certified in AWS Solutions Architect Associate and Subject Matter Expert in AWS S3, with proven expertise in multi-domain technical environments. I also have experience as a software developer in my early years of experience.",
    experience: [
        {
            title: "AWS Cloud Engineer I",
            company: "Amazon Web Services",
            period: "2021 - Present",
            description: "Providing expert cloud support, guidance and solutions to AWS Services customers. Subject Matter Expert (SME) for Amazon S3, assisting in escalations and complex customer use cases. Participated in planning, developing, and implementing AWS Control Towers for security and governance best practices. Expertise in infrastructure automation using CloudFormation to create scalable, secure templates that describes all the AWS resources such as the creation of S3 buckets, EC2 instances with all needed features. Published technical knowledge articles and trained new hires, contributing to skill development within the team."
        },
        {
            title: "Software Developer Intern",
            company: "24.com(Media24)",
            period: "2020 - 2021",
            description: "Migrated legacy systems to Microsoft Azure, ensuring seamless backend integration and optimized performance. Developed backend solutions using .NET Core and supported database migration initiatives."
        },
        {
            title: "Fashion Consultant",
            company: "TFG (Foschini)",
            period: "2017 - 2018",
            description: "Skilled cashier. Experienced in day to day running of the store including cash flow management."
        }
    ],
    skills: [
        "JavaScript", "React", "Node.js", "Python",
        "HTML5", "CSS3", "Git", "AWS", "C#(.NetCore)", "SQL", "Java"
    ],
    education: [
         {
            school: "Education Background",
            qualification: "BSc in Computer Science and Computer Engineering",
            graduation_year: "2020",
            university: "University of Cape Town"
        },
        {
            school: "Certification",
            qualification: "Subject Matter Expert (SME) for Amazon S3",
            graduation_year: "2024",
            university: "Amazon Web Services"
        },
        {
            school: "Certification",
            qualification: "AWS Certified Solutions Architect Associate",
            graduation_year: "2022",
            university: "Amazon Web Services"
        }
    ],
};

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadBio();
    loadExperience();
    loadEducation();
    loadSkills();
});

// Navigation
function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Update navigation buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
}

// Load Bio
function loadBio() {
    document.getElementById('bio').textContent = myCVData.bio;
}

// Load Experience
function loadExperience() {
    const experienceList = document.getElementById('experience-list');
    experienceList.innerHTML = myCVData.experience.map(exp => `
        <div class="experience-item">
            <h3>${exp.title}</h3>
            <h4>${exp.company}</h4>
            <p class="period">${exp.period}</p>
            <p>${exp.description}</p>
        </div>
    `).join('');
}

// Load Skills
function loadSkills() {
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = myCVData.skills.map(skill => `
        <div class="skill-item">${skill}</div>
    `).join('');
}

// Load Education
function loadEducation() {
    const educationList = document.getElementById('education-list');
    educationList.innerHTML = myCVData.education.map(edu => `
        <div class="experience-item">
            <h3>${edu.school}</h3>
            <h4>${edu.qualification}</h4>
            <p class="period">${edu.graduation_year}</p>
            <p>${edu.university}</p>
        </div>
    `).join('');
}

// For the Contact Form
function handleContactSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    
    // Send acknowledgement
    alert('Thank you for your message! I will get back to you soon.');
    event.target.reset();
}

// Adding a hover effect to profile picture
document.getElementById('profile-pic').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.1)';
});

document.getElementById('profile-pic').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});

// Adding a smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Function to generate PDF using html2canvas and jsPDF
async function generatePDF() {
    // Create a new jsPDF instance
    const pdf = new jsPDF('p', 'mm', 'a4');
    const elements = document.querySelectorAll('.section');
    let yOffset = 10;

    // Add header content
    pdf.setFontSize(24);
    pdf.text('Simnikiwe Khonto', 20, yOffset);
    yOffset += 10;
    
    pdf.setFontSize(16);
    pdf.text('Cloud Support Engineer I', 20, yOffset);
    yOffset += 10;

    // Add contact information
    pdf.setFontSize(12);
    pdf.text('Email: example@gmail.com', 20, yOffset);
    yOffset += 7;
    pdf.text('Location: CT, SA', 20, yOffset);
    yOffset += 15;

    // Add sections
    for (const section of elements) {
        // Add section title
        pdf.setFontSize(14);
        pdf.setFont(undefined, 'bold');
        pdf.text(section.querySelector('h2').textContent, 20, yOffset);
        yOffset += 10;

        // Add section content
        pdf.setFontSize(12);
        pdf.setFont(undefined, 'normal');
        
        const content = section.textContent.replace(section.querySelector('h2').textContent, '').trim();
        const splitContent = pdf.splitTextToSize(content, 170);
        
        pdf.text(splitContent, 20, yOffset);
        yOffset += splitContent.length * 7 + 10;

        // Add page if content exceeds page height
        if (yOffset > 270) {
            pdf.addPage();
            yOffset = 20;
        }
    }

    return pdf;
}

// Function to handle the download
async function downloadCV() {
    const downloadBtn = document.querySelector('.download-btn');
    
    try {
        // Show loading state
        downloadBtn.classList.add('loading');
        downloadBtn.disabled = true;

        // Load required libraries dynamically
        await loadLibraries();

        // Generate PDF
        const pdf = await generatePDF();
        
        // Save the PDF
        pdf.save('Simnikiwe_Khonto_CV.pdf');

    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('There was an error generating the PDF. Please try again.');
    } finally {
        // Remove loading state
        downloadBtn.classList.remove('loading');
        downloadBtn.disabled = false;
    }
}

// Function to load required libraries
async function loadLibraries() {
    return new Promise((resolve, reject) => {
        // Check if libraries are already loaded
        if (window.jsPDF && window.html2canvas) {
            resolve();
            return;
        }

        // Load jsPDF and html2canvas
        const jsPDFScript = document.createElement('script');
        const html2canvasScript = document.createElement('script');

        jsPDFScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
        html2canvasScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';

        let loadedCount = 0;
        const onLoad = () => {
            loadedCount++;
            if (loadedCount === 2) resolve();
        };

        jsPDFScript.onload = onLoad;
        html2canvasScript.onload = onLoad;
        jsPDFScript.onerror = reject;
        html2canvasScript.onerror = reject;

        document.head.appendChild(jsPDFScript);
        document.head.appendChild(html2canvasScript);
    });
}

// Function to create a custom PDF template
async function createCustomPDFTemplate() {
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    
    // Add header
    pdf.setFillColor(33, 150, 243); // Blue header
    pdf.rect(0, 0, 210, 40, 'F');
    
    // Add name
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(24);
    pdf.text('Simnikiwe Khonto', 20, 20);
    
    // Add title
    pdf.setFontSize(16);
    pdf.text('Cloud Support Engineer I', 20, 30);
    
    // Add contact information
    pdf.setTextColor(0, 0, 0);
    pdf.setFontSize(12);
    pdf.text('Email: example@gmail.com', 20, 50);
    pdf.text('Location: CT, SA', 20, 60);
    pdf.text('LinkedIn: http://linkedin.com/in/simnikiwe-khonto-4b8816127', 20, 70);
    
    return pdf;
}

// Update the generatePDF function to use the custom template
async function generatePDF() {
    const pdf = await createCustomPDFTemplate();
    // ... rest of the generation logic
    return pdf;
}
