function downloadPDF() {
    const resume = document.getElementById("resume-output");
  
    // Use html2pdf to convert resume to PDF and download
    html2pdf()
      .from(resume)
      .set({
        margin: 3,
        filename: "resume.pdf",
        html2canvas: { scale: 2 },
        jsPDF: { orientation: "portrait" },
      })
      .save();
  }
  
  function previewImage(event) {
    const image = document.getElementById("imagePreview");
    image.src = URL.createObjectURL(event.target.files[0]);
    image.style.display = "block";
  }
  
  function generateResume() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const education = document.getElementById("education").value;
    const experience = document.getElementById("experience").value;
    const skills = document.getElementById("skills").value;
    const resumeOutput = document.getElementById("resume-output");
    const image = document.getElementById("imagePreview").src;
  
    resumeOutput.innerHTML = `
    <div style="display:flex;  align-items: center; justify-content:space-evenly;">
    <div style="flex-direction:column-reverse;  ">
            <img src="${image}" alt="Profile Picture" style="width:10vw; heigth:10vh; border-radius:50%;" ></div>
        <div style="margin-right:10%;">  <p>Name: ${name}</p>
          <p>Email: ${email}</p>
          <p>Phone: ${phone}</p>
          <h3>Education:</h3>
          <p>${education}</p>
          <h3>Work Experience:</h3>
          <p>${experience}</p>
          <h3>Skills:</h3>
          <p>${skills}</p></div></div>
      `;
  
    const queryString = `?name=${encodeURIComponent(
      name
    )}&email=${encodeURIComponent(email)}&education=${encodeURIComponent(
      education
    )}&skills=${encodeURIComponent(skills)}&work=${encodeURIComponent(
      work
    )}&image=${encodeURIComponent(image)}`;
    const shareableLink = `${window.location.origin}${window.location.pathname}${queryString}`;
    document.getElementById(
      "share-link"
    ).innerHTML = `<a href="${shareableLink}" target="_blank">Shareable Resume Link</a>`;
  
    resumeOutput.classList.add("animated");
  }
  
  window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
  
    if (urlParams.has("name")) {
      const name = urlParams.get("name");
      const email = urlParams.get("email");
      const education = urlParams.get("education");
      const skills = urlParams.get("skills");
      const work = urlParams.get("work");
      const image = urlParams.get("image");
  
      const resumeOutput = document.getElementById("resume-output");
  
      resumeOutput.innerHTML = `
              <img src="${image}" alt="Profile Picture" style="width:10vw; height:10vh; border-radius:50%;"><br>
              <h2>${name}</h2>
              <p>Email: ${email}</p>
              <h3>Education</h3>
              <p>${education}</p>
              <h3>Skills</h3>
              <p>${skills}</p>
              <h3>Work Experience</h3>
              <p>${work}</p>
          `;
  
      resumeOutput.classList.add("animated");
    }
  };