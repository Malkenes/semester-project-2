export function renderProfile(data) {
    const profileHTML = 
    `
    <div class="col-lg-6" style="background-image: url(${data.banner.url})">
      ${renderEditProfileButton(data.name)}
      <div class="d-flex justify-content-around align-items-center h-200">
        <img class="rounded-circle border border-primary" src="${data.avatar.url}" height="96px" width="96px">
        <div class="bg-white bg-opacity-50 p-3 rounded border border-primary">
          <h1>${data.name}</h1>
        </div>
      </div>
    </div>
    <div class="col-lg-6">
      <div class="row h-200 align-items-center">
        <div class="col-8 d-flex justify-content-center">
          <div>${renderBio(data.bio)}</div>
        </div>
        <div class="col-4">
          <ul class="list-group">
            <li class="list-group-item list-group-item-primary d-flex justify-content-between align-items-center">
              Credit:
              <div class="bid-xs">
                ${data.credits}
              </div>
            </li>
            <li class="list-group-item list-group-item-primary d-flex justify-content-between align-items-center">
              Wins:
              <div>
                ${data._count.wins}
              </div>
            </li>
            <li class="list-group-item list-group-item-primary d-flex justify-content-between align-items-center">
              Listings:
              <div>
                ${data._count.listings}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    `
    return profileHTML;
  }
  
  function renderEditProfileButton(name) {
    if (name !== localStorage.getItem("name")) {
      return "";
    } else {
      return `
      <div class="position-absolute my-1">
        <a href="edit_profile.html?name=${name}" class="btn">
          <i class="fas fa-gear fs-3"></i>
          <span class="visually-hidden">edit profile</span>
        </a>
      </div>
      `
    }
  }
  
  function renderBio(bio) {
    if (bio) {
      return bio;
    } else {
      return "";
    }
  }  