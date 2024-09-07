// script.ts

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById('resumeForm') as HTMLFormElement;
    const resumeOutput = document.getElementById('resumeOutput') as HTMLDivElement;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        generateResume();
    });

    function generateResume(): void {
        const name = (document.getElementById('name') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        const phone = (document.getElementById('phone') as HTMLInputElement).value;
        const education = (document.getElementById('education') as HTMLTextAreaElement).value;
        const workExperience = (document.getElementById('workExperience') as HTMLTextAreaElement).value;
        const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;

        resumeOutput.innerHTML = `
            <div class="resume-header">
                <h2 contenteditable="true">${name}</h2>
                <p>Email: <span class="editable" data-field="email">${email}</span></p>
                <p>Phone: <span class="editable" data-field="phone">${phone}</span></p>
            </div>
            <div class="resume-section">
                <h3>Education</h3>
                <p class="editable" data-field="education">${education}</p>
            </div>
            <div class="resume-section">
                <h3>Work Experience</h3>
                <p class="editable" data-field="workExperience">${workExperience}</p>
            </div>
            <div class="resume-section">
                <h3>Skills</h3>
                <p class="editable" data-field="skills">${skills}</p>
            </div>
        `;

        makeEditable();
    }

    function makeEditable(): void {
        const editableElements = document.querySelectorAll('.editable, .resume-header h2');

        editableElements.forEach(element => {
            element.addEventListener('click', function () {
                const currentText = (this as HTMLElement).innerText;
                const input = document.createElement('textarea');
                input.value = currentText;
                input.classList.add('editable-input');
                (this as HTMLElement).innerHTML = '';
                (this as HTMLElement).appendChild(input);
                input.focus();

                input.addEventListener('blur', function () {
                    const newValue = input.value;
                    (element as HTMLElement).innerText = newValue;
                    updateResumeData((element as HTMLElement).getAttribute('data-field') as string, newValue);
                });

                input.addEventListener('keypress', function (e: KeyboardEvent) {
                    if (e.key === 'Enter') {
                        input.blur();
                    }
                });
            });
        });
    }

    function updateResumeData(field: string | null, value: string): void {
        if (field) {
            const input = document.querySelector(`input[name="${field}"]`) as HTMLInputElement;
            if (input) {
                input.value = value;
            }
        }
    }
});
