// Typing animation
var typed = new Typed(".auto-input", { strings: ["SHA 256 Hash Generator"], typedSpeed: 100, backSpeed: 100, loop: true });

// Copy Hash Function
function copyHash() {
    var copyText = document.getElementById("sha");
    copyText.select();
    copyText.setSelectionRange(0, 99999); /*For mobile devices*/
    navigator.clipboard.writeText(copyText.value);
    alert("Copied the hash to your clipboard");
}

var sha = document.getElementById('sha');
async function get_hash() {
    let sha_text = document.getElementById('sha_text').value;
    let search = document.getElementById('search');
    // Get the current URL and parameters as a URL object
    let url = new URL(location.href);

    if (sha_text !== '') {
        document.getElementById("copy-btn").disabled = false;
        // Set the parameter
        url.searchParams.set('search', sha_text);
        window.history.replaceState({}, null, `${url}`);
        let data = await fetch(`${url}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        data = await data.json();
        sha.innerHTML = data.hash;
        sha_text.innerHTML = data.search;
    }
    else {
        sha.innerText = '';
        sha_text.innerHTML = '';
        document.getElementById("copy-btn").disabled = true;
        window.history.replaceState({}, null, `/`);
    }
}
