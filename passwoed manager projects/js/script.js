const showPassword = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("password");
    if (data == null) {
        tb.innerHTML = "<tr><td colspan='4'>No data to show</td></tr>";
    } else {
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            str += `<tr>
                <td>${element.website}</td>
                <td>${element.username}</td>
                <td>
                    <span class="masked-password" data-index="${index}">${"*".repeat(element.password.length)}</span>
                    <button class="toggle-password-btn" data-index="${index}">Show</button>
                </td>
                <td><button class="delete-btn" data-index="${index}">Delete</button></td>
            </tr>`;
        }
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>` + str;

        // Add delete functionality
        document.querySelectorAll(".delete-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                let index = e.target.getAttribute("data-index");
                deletePassword(index);
            });
        });

        // Add toggle password functionality
        document.querySelectorAll(".toggle-password-btn").forEach(button => {
            button.addEventListener("click", (e) => {
                let index = e.target.getAttribute("data-index");
                togglePassword(index);
            });
        });
    }
};

const togglePassword = (index) => {
    let data = JSON.parse(localStorage.getItem("password"));
    let passwordSpan = document.querySelector(`.masked-password[data-index="${index}"]`);
    let toggleButton = document.querySelector(`.toggle-password-btn[data-index="${index}"]`);

    if (passwordSpan.textContent === "*".repeat(data[index].password.length)) {
        // Show the actual password
        passwordSpan.textContent = data[index].password;
        toggleButton.textContent = "Hide";
    } else {
        // Mask the password again
        passwordSpan.textContent = "*".repeat(data[index].password.length);
        toggleButton.textContent = "Show";
    }
};

const deletePassword = (index) => {
    let data = JSON.parse(localStorage.getItem("password"));
    data.splice(index, 1);
    confirmation=confirm("Are you sure you want to delete this password?");
    if (confirmation) {
        localStorage.setItem("password", JSON.stringify(data));
        showPassword();
    }
    else{
        console.log("Password not deleted");
    }
};

// Function to filter table rows based on search input
document.getElementById("search").addEventListener("input", function () {
    const filter = this.value.toLowerCase(); // Get the search input and convert to lowercase
    const rows = document.querySelectorAll("table tr"); // Select all table rows

    rows.forEach((row, index) => {
        if (index === 0) return; // Skip the header row
        const website = row.cells[0]?.textContent.toLowerCase() || ""; // Get website cell content
        const username = row.cells[1]?.textContent.toLowerCase() || ""; // Get username cell content

        // Check if the row matches the search query
        if (website.includes(filter) || username.includes(filter)) {
            row.style.display = ""; // Show the row
        } else {
            row.style.display = "none"; // Hide the row
        }
    });
});

function passwordform(){
    document.getElementById("passwordForm").addEventListener("submit", (e) => {
        e.preventDefault();
        let username = document.getElementById("username").value;
        let website = document.getElementById("text").value;
        let password = document.getElementById("password").value;
    
        let passwords = localStorage.getItem("password");
        if (passwords == null) {
            let json = [];
            json.push({ website, username, password });
            alert("Password saved");
            localStorage.setItem("password", JSON.stringify(json));
        } else {
            let json = JSON.parse(passwords);
            json.push({ website, username, password });
            alert("Password saved");
            localStorage.setItem("password", JSON.stringify(json));
        }
        event.target.reset(); // Reset the form fields
        showPassword();
    });
}

function main() {
    passwordform();
    console.log("Hello, World!");
    showPassword();
}

main();