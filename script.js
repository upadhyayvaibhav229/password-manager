// Function to mask a password
function maskPassword(pass) {
    let str = "";
    for (let index = 0; index < pass.length; index++) {
        str += "*";
    }
    return str;
}

// Function to copy text to the clipboard
function copyText(txt) {
    navigator.clipboard.writeText(maskPassword(txt)).then(
        () => {
            // Clipboard successfully set
            document.getElementById("Copied").style.display = "inline";
            setTimeout(() => {
                document.getElementById("Copied").style.display = "none";
            }, 2000);
        },
        () => {
            alert("Copy failed");
        }
    );
}

// Function to delete a password
const deletePassword = (website) => {
    let data = localStorage.getItem("passwords");
    let arr = JSON.parse(data) || [];
    const arrUpdated = arr.filter((e) => e.website !== website);
    localStorage.setItem("passwords", JSON.stringify(arrUpdated));
    alert(`Successfully deleted ${website}'s password`);
    showPasswords();
}

// Function to display passwords in a table
const showPasswords = () => {
    let tb = document.querySelector("table");
    let data = localStorage.getItem("passwords");
    if (!data || JSON.parse(data).length === 0) {
        tb.innerHTML = "No data to show";
    } else {
        tb.innerHTML = `<tr>
            <th>Website</th>
            <th>Username</th>
            <th>Password</th>
            <th>Delete</th>
        </tr>`;
        let arr = JSON.parse(data);
        let str = "";
        for (let index = 0; index < arr.length; index++) {
            const element = arr[index];
            str += `<tr>
                <td>${element.website} <img src="copy.svg" alt="Copy" onclick="copyText('${element.website}')" width="24" height="24"></td>
                <td>${element.Username} <img src="copy.svg" alt="Copy" onclick="copyText('${element.Username}')" width="24" height="24"></td>
                <td>${maskPassword(element.password)} <img src="copy.svg" alt="Copy" onclick="copyText('${element.password}')" width="24" height="24"></td>
                <td><button class="btnsm" onclick="deletePassword('${element.website}')">Delete</button></td>
            </tr>`;
        }
        tb.innerHTML = tb.innerHTML + str;
    }
    // Assuming you have elements with the IDs "website," "Username," and "password" in your HTML
    document.getElementById("website").value = "";
    document.getElementById("Username").value = "";
    document.getElementById("password").value = "";
}

console.log("working");
showPasswords();

document.querySelector(".btn").addEventListener("click", (e) => {
    e.preventDefault();
    let website = document.getElementById("website").value;
    let Username = document.getElementById("Username").value;
    let password = document.getElementById("password").value;

    let passwords = localStorage.getItem("passwords");
    let json = passwords ? JSON.parse(passwords) : [];
    json.push({ website: website, Username: Username, password: password });
    localStorage.setItem("passwords", JSON.stringify(json));
    alert("Password saved");
    showPasswords();
});
