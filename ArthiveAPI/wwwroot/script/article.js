const profile = document.getElementById('profile')
const write = document.getElementById('write')
const to_main = document.getElementById('to_main')

const back = document.getElementById('back')

const wr = document.getElementById('wr')

const dis = document.getElementById('dis')
const prog = document.getElementById('prog')
const front = document.getElementById('front')
const bac = document.getElementById('bac')


/*навигация*/
to_main.addEventListener('click', function() {
    window.location = 'main.html'
});

profile.addEventListener('click', function() {
    window.location = 'profile.html'
});

write.addEventListener('click', function() {
    window.location = 'write.html'
});

wr.addEventListener('click', function() {
    window.location = 'write.html'
});

back.addEventListener('click', function() {
    window.history.go(-1);
});

/*боковое*/

dis.addEventListener('click', function() {
    list(dis)
});localStorage.setItem('major', "design")

prog.addEventListener('click', function() {
    list(prog)
});

front.addEventListener('click', function() {
    list(front)
});

bac.addEventListener('click', function() {
    list(bac)
});

function list(elem){
    let choice = document.createElement('select')
    choice.classList.add('way')
    choice.innerHTML = `
    <option value="статьи">Статьи</option>
    <option value="статьи">Материалы</option>
    <option value="статьи">Книги</option>`
    elem.append(choice)
}

/*попытки связать*/
let Id = localStorage.getItem('id')

function display(element){
        let cont = document.createElement("div");
        cont.classList.add('note')
        task.innerHTML = `
        <div class="note_info">
            <img class="fimg2" src="${element.photo_author}">
                <p class="author_namr">${element.name_author}</p>
                        <p class="date">${element.date}</p>
                    </div>
                    <h2>${element.PostName}</h2>
                    <div class="mark">
                        <div class="stars">
                            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0144 4.90852C11.7877 1.63618 12.6743 0 14 0C15.3256 0 16.2123 1.63617 17.9855 4.90851L18.4443 5.75511C18.9483 6.685 19.2001 7.14996 19.5931 7.45674C19.986 7.76352 20.4751 7.87739 21.4537 8.10515L22.3447 8.3125C25.7881 9.11398 27.51 9.51471 27.9196 10.8697C28.3292 12.2247 27.1555 13.6368 24.8078 16.4606L24.2005 17.1912C23.5334 17.9936 23.1998 18.3948 23.0497 18.8912C22.8998 19.3877 22.9502 19.923 23.051 20.9937L23.1428 21.9684C23.4977 25.7361 23.6752 27.6199 22.6028 28.4573C21.5303 29.2948 19.9182 28.5312 16.694 27.0042L15.8599 26.6091C14.9437 26.1752 14.4856 25.9581 14 25.9581C13.5143 25.9581 13.0562 26.1752 12.1401 26.6091L11.306 27.0042C8.08174 28.5312 6.46965 29.2948 5.39721 28.4573C4.32477 27.6199 4.50223 25.7361 4.85716 21.9684L4.94897 20.9937C5.04984 19.923 5.10027 19.3877 4.9502 18.8912C4.80015 18.3948 4.4666 17.9936 3.79949 17.1912L3.19214 16.4606C0.844552 13.6368 -0.329249 12.2247 0.0803906 10.8697C0.49003 9.51471 2.2118 9.11398 5.65535 8.3125L6.54624 8.10515C7.52478 7.87739 8.01406 7.76352 8.40691 7.45674C8.79976 7.14996 9.05173 6.68502 9.55565 5.75511L10.0144 4.90852Z" fill="#EDEDED"/>
                            </svg>
                            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0144 4.90852C11.7877 1.63618 12.6743 0 14 0C15.3256 0 16.2123 1.63617 17.9855 4.90851L18.4443 5.75511C18.9483 6.685 19.2001 7.14996 19.5931 7.45674C19.986 7.76352 20.4751 7.87739 21.4537 8.10515L22.3447 8.3125C25.7881 9.11398 27.51 9.51471 27.9196 10.8697C28.3292 12.2247 27.1555 13.6368 24.8078 16.4606L24.2005 17.1912C23.5334 17.9936 23.1998 18.3948 23.0497 18.8912C22.8998 19.3877 22.9502 19.923 23.051 20.9937L23.1428 21.9684C23.4977 25.7361 23.6752 27.6199 22.6028 28.4573C21.5303 29.2948 19.9182 28.5312 16.694 27.0042L15.8599 26.6091C14.9437 26.1752 14.4856 25.9581 14 25.9581C13.5143 25.9581 13.0562 26.1752 12.1401 26.6091L11.306 27.0042C8.08174 28.5312 6.46965 29.2948 5.39721 28.4573C4.32477 27.6199 4.50223 25.7361 4.85716 21.9684L4.94897 20.9937C5.04984 19.923 5.10027 19.3877 4.9502 18.8912C4.80015 18.3948 4.4666 17.9936 3.79949 17.1912L3.19214 16.4606C0.844552 13.6368 -0.329249 12.2247 0.0803906 10.8697C0.49003 9.51471 2.2118 9.11398 5.65535 8.3125L6.54624 8.10515C7.52478 7.87739 8.01406 7.76352 8.40691 7.45674C8.79976 7.14996 9.05173 6.68502 9.55565 5.75511L10.0144 4.90852Z" fill="#EDEDED"/>
                            </svg>
                            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0144 4.90852C11.7877 1.63618 12.6743 0 14 0C15.3256 0 16.2123 1.63617 17.9855 4.90851L18.4443 5.75511C18.9483 6.685 19.2001 7.14996 19.5931 7.45674C19.986 7.76352 20.4751 7.87739 21.4537 8.10515L22.3447 8.3125C25.7881 9.11398 27.51 9.51471 27.9196 10.8697C28.3292 12.2247 27.1555 13.6368 24.8078 16.4606L24.2005 17.1912C23.5334 17.9936 23.1998 18.3948 23.0497 18.8912C22.8998 19.3877 22.9502 19.923 23.051 20.9937L23.1428 21.9684C23.4977 25.7361 23.6752 27.6199 22.6028 28.4573C21.5303 29.2948 19.9182 28.5312 16.694 27.0042L15.8599 26.6091C14.9437 26.1752 14.4856 25.9581 14 25.9581C13.5143 25.9581 13.0562 26.1752 12.1401 26.6091L11.306 27.0042C8.08174 28.5312 6.46965 29.2948 5.39721 28.4573C4.32477 27.6199 4.50223 25.7361 4.85716 21.9684L4.94897 20.9937C5.04984 19.923 5.10027 19.3877 4.9502 18.8912C4.80015 18.3948 4.4666 17.9936 3.79949 17.1912L3.19214 16.4606C0.844552 13.6368 -0.329249 12.2247 0.0803906 10.8697C0.49003 9.51471 2.2118 9.11398 5.65535 8.3125L6.54624 8.10515C7.52478 7.87739 8.01406 7.76352 8.40691 7.45674C8.79976 7.14996 9.05173 6.68502 9.55565 5.75511L10.0144 4.90852Z" fill="#EDEDED"/>
                            </svg>
                            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0144 4.90852C11.7877 1.63618 12.6743 0 14 0C15.3256 0 16.2123 1.63617 17.9855 4.90851L18.4443 5.75511C18.9483 6.685 19.2001 7.14996 19.5931 7.45674C19.986 7.76352 20.4751 7.87739 21.4537 8.10515L22.3447 8.3125C25.7881 9.11398 27.51 9.51471 27.9196 10.8697C28.3292 12.2247 27.1555 13.6368 24.8078 16.4606L24.2005 17.1912C23.5334 17.9936 23.1998 18.3948 23.0497 18.8912C22.8998 19.3877 22.9502 19.923 23.051 20.9937L23.1428 21.9684C23.4977 25.7361 23.6752 27.6199 22.6028 28.4573C21.5303 29.2948 19.9182 28.5312 16.694 27.0042L15.8599 26.6091C14.9437 26.1752 14.4856 25.9581 14 25.9581C13.5143 25.9581 13.0562 26.1752 12.1401 26.6091L11.306 27.0042C8.08174 28.5312 6.46965 29.2948 5.39721 28.4573C4.32477 27.6199 4.50223 25.7361 4.85716 21.9684L4.94897 20.9937C5.04984 19.923 5.10027 19.3877 4.9502 18.8912C4.80015 18.3948 4.4666 17.9936 3.79949 17.1912L3.19214 16.4606C0.844552 13.6368 -0.329249 12.2247 0.0803906 10.8697C0.49003 9.51471 2.2118 9.11398 5.65535 8.3125L6.54624 8.10515C7.52478 7.87739 8.01406 7.76352 8.40691 7.45674C8.79976 7.14996 9.05173 6.68502 9.55565 5.75511L10.0144 4.90852Z" fill="#EDEDED"/>
                            </svg>
                            <svg width="28" height="29" viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M10.0144 4.90852C11.7877 1.63618 12.6743 0 14 0C15.3256 0 16.2123 1.63617 17.9855 4.90851L18.4443 5.75511C18.9483 6.685 19.2001 7.14996 19.5931 7.45674C19.986 7.76352 20.4751 7.87739 21.4537 8.10515L22.3447 8.3125C25.7881 9.11398 27.51 9.51471 27.9196 10.8697C28.3292 12.2247 27.1555 13.6368 24.8078 16.4606L24.2005 17.1912C23.5334 17.9936 23.1998 18.3948 23.0497 18.8912C22.8998 19.3877 22.9502 19.923 23.051 20.9937L23.1428 21.9684C23.4977 25.7361 23.6752 27.6199 22.6028 28.4573C21.5303 29.2948 19.9182 28.5312 16.694 27.0042L15.8599 26.6091C14.9437 26.1752 14.4856 25.9581 14 25.9581C13.5143 25.9581 13.0562 26.1752 12.1401 26.6091L11.306 27.0042C8.08174 28.5312 6.46965 29.2948 5.39721 28.4573C4.32477 27.6199 4.50223 25.7361 4.85716 21.9684L4.94897 20.9937C5.04984 19.923 5.10027 19.3877 4.9502 18.8912C4.80015 18.3948 4.4666 17.9936 3.79949 17.1912L3.19214 16.4606C0.844552 13.6368 -0.329249 12.2247 0.0803906 10.8697C0.49003 9.51471 2.2118 9.11398 5.65535 8.3125L6.54624 8.10515C7.52478 7.87739 8.01406 7.76352 8.40691 7.45674C8.79976 7.14996 9.05173 6.68502 9.55565 5.75511L10.0144 4.90852Z" fill="#EDEDED"/>
                            </svg>
                            <p class="mark_number">5</p>
                        </div>
                    </div>
                    <img src="${element.PictureURL}" class="fimg3">
                    <p class="discription">${element.Description}</p>
                    <img src="article/static/for_article.svg" class="saved">`;
        document.getElementById(`${element.Category}`).append(cont)
}

filter("design")
filter("programming")
filter("frontend")
filter("backend")