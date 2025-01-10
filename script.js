//박세민/60210021/기초웹 과제#3

////홈페이지 관련 JS
/*1. (change/click/preventDefalut 활용) 스터디플래너 공부+복습 체크 시*/
//1) 공부 체크 시 -> 텍스트 색을 파랑색으로 
//2) 복습 체크 시 -> 텍스트에 중간 선(line-through), 오늘 끝낸 일 개수 업데이트
//3) 공부 체크 전까지는 복습 checkbox에 대해 preventDefault()
const reviwCheckLock = [false, false, false, false]
// 모든 체크박스와 관련된 요소를 처리하기 위해 반복문 사용
const studyChecks = document.querySelectorAll('[class^="study"]')
//'[class^="study"]': class 속성의 값이 "study"로 시작하는 모든 요소를 선택
studyChecks.forEach((checkBox, index) => {
    checkBox.addEventListener('change', () => {
        const subject = document.querySelector(`.subject${index + 1}`)
        const content = document.querySelector(`.content${index + 1}`)
        reviwCheckLock[index] = checkBox.checked
        const color = checkBox.checked ? "blue" : "black"
        subject.style.color = color
        content.style.color = color
    })
})
// 모든 체크박스와 관련된 요소를 처리하기 위해 반복문 사용
const reviwChecks = document.querySelectorAll('[class^="review"]')
//'[class^="review"]': class 속성의 값이 "review"로 시작하는 모든 요소를 선택
const countToDo = document.querySelector('.countToDo')
const total = 4
let finished = 0
reviwChecks.forEach((checkBox, index) => {
    checkBox.addEventListener('click',(event)=>{
        if(!reviwCheckLock[index]){
            event.preventDefault()
        }
    })
    checkBox.addEventListener('change', () => {
        const subject = document.querySelector(`.subject${index + 1}`)
        const content = document.querySelector(`.content${index + 1}`)
        const line = checkBox.checked ? "line-through" : "none"
        subject.style.textDecoration = line
        content.style.textDecoration = line
        if(checkBox.checked){
            finished++
        }else{
            finished--
        }
        countToDo.innerHTML = `오늘의 일정은 총 <strong>${total}</strong>개입니다. 현재까지 <strong>${finished}</strong>개 완료했습니다.`
    })
})


/*2. 자주가는 사이트 추가/삭제 기능*/
const inputLink = document.querySelector('#add-link')
const addButton = document.querySelector('#add-link-button')
const linkList = document.querySelector('.link-list')

//기존에 있는 link들을 포함하여 keyCount 만들기
const linklis = document.querySelectorAll('.linkli')
let keyCount = linklis.length

//link 추가하는 함수
const addLink = ()=>{
    if(inputLink.value.trim()===''){
        alert('링크를 입력해주세요.')
        return
    }
    if(inputLink.value.indexOf(',')===-1){
        alert('올바른 형식으로 입력해주세요.')
        return
    }
    const inputArr = inputLink.value.split(',')
    if(inputArr[0].trim().length<1 || inputArr[1].trim().length<1){
        alert('올바른 형식으로 입력해주세요.')
        return
    }
    const li = document.createElement('li')
    const a = document.createElement('a')
    const button = document.createElement('button')

    const key = keyCount
    keyCount += 1

    li.setAttribute('data-key',key)
    li.setAttribute('class','linkli')

    a.setAttribute('href', inputArr[1])
    a.setAttribute('title', inputArr[0])
    a.setAttribute('target', '_blank')
    a.textContent = inputArr[0]

    button.setAttribute('class', 'removelink')
    button.textContent = 'X'
    button.addEventListener('click',()=>{
        removeLink(key)
    })

    linkList.appendChild(li)
    li.appendChild(a)
    li.appendChild(button)
}
//link 삭제하는 함수
const removeLink = (key)=>{
    const li = document.querySelector(`[data-key="${key}"]`)
    li.parentNode.removeChild(li)
}

//addButton이나 Enter누르면 addLink수행
addButton.addEventListener('click', addLink)
inputLink.addEventListener('keyup',(event)=>{
    const ENTER = 13
    if(event.keyCode === ENTER){
        addLink()
    }
})

//기존에 있던 link의 removeButton에 이벤트리스너 달기
const removeLinkButtons = document.querySelectorAll('.removelink')
removeLinkButtons.forEach((button, index) => {
    button.addEventListener('click',()=>{
        removeLink(index)//기존에 있던 link들은 index가 곧 key임
    })
})
