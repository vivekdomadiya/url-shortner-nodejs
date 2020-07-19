$(".close").click(() => {
  $(".alert").remove();
});

const domain = location.href;

$("#shortner").submit(async (e) => {
  e.preventDefault();
  const longUrl = $("#longUrl").val();
  $("#submitBtn").html(`<div class="spinner-border"></div>`);
  $("#response").html("");

  await fetch("/createShortLink", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ longUrl: longUrl }),
  })
    .then((data) => data.json())
    .then((response) => {
      if (response.error) {
        handleError(response.error);
      } else {
        const shortUrl = domain + response.code;
        handleSuccess(`Hooray!!! The link can now be visited through <br>
        <a target="_blank" class="shortUrl" href=${shortUrl} rel = "noopener noreferer" > ${shortUrl} </a>`);
        copy(shortUrl);
      }
    })
    .catch((err) => {
      console.log("oops ", err);
      handleError("Network error, Please try again!");
    });

  $("#submitBtn").html("Shorten");
});

const handleSuccess = (msg) => {
  $("#response").html(`<div class="alert alert-success">${msg}</div>`);
};

const handleError = (msg) => {
  $("#response").html(`<div class="alert alert-danger">${msg}</div>`);
};

const copy = (val) => {
  const e = `<input type='text' value="${val}" id="d">`;
  $("body").append(e);
  const d = $("#d");
  d.select();
  document.execCommand("copy");
  d.remove();
};
