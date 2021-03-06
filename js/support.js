document.addEventListener("DOMContentLoaded", function (event) {

    var submit = document.getElementById("submitBtn");

    submit.onclick = async function () {
        var input = document.getElementById("supportMsg").value
        var name = document.getElementById("supportName").value
        var type = document.getElementById("type").value

        let msgbox = new MessageBox("#msgbox-area", {
            closeTime: 5000,
            hideCloseButton: false
        });

        function validateName(e) {
            const re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            const re2 = /^.{3,32}#[0-9]{4}$/;
            const re3 = /[0-9]{17,28}/
            return re.test(String(e).toLowerCase()) || re2.test(e) || re3.test(e) ;
        }

        if (!validateName(name)) {
            msgbox.show("You must give a valid discord name, id or email!\n\nExamples: \nabc@gmail.com\nexample#1234")
            return
        }

        if (!(input.length > 50 && input.length < 1500)) {
            msgbox.show("Your message must be in between 50 and 1500 characters!")
            return
        }

        if (!(type == '')) {
            submit.disabled = true;

            setTimeout(() => {
                submit.disabled = false;
            }, 3000);

            const request = new XMLHttpRequest()
            const webhook = "https://discord.com/api/webhooks/838006978768928778/n6zowoP5emWlyFHR1q-NmDKrLwmkDac5wzebPFyKlR3IOmx8lDl6-SmkCabTpAnopKzz"
            request.open("POST", webhook)
            request.setRequestHeader('Content-type', 'application/json');
            var content = {
                username: "Support Notifications",
                avatar_url: "https://cdn.discordapp.com/avatars/812395879146717214/8a16fab9ec3c48bf12d18d7736a36a9f.png?size=128",
                embeds: [{
                    title: type,
                    description: input,
                    footer: { text: `Author: ${name}` },
                    url: "https://github.com/dank-tagg/Groot"
                }]
            }
            request.send(JSON.stringify(content));
            msgbox.show(`Sent your message! \nIf you've put in a discord ID or tag, we will DM you.`, "#3CA374");
            return;

        } else {
            msgbox.show("You must select a type of support!")
            return
        }
    }
});
