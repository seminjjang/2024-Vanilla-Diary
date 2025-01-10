//박세민/60210021/기초웹 과제#3

////form 페이지 관련 JS
/*1. (change 활용)카테고리 선택하면 000작성으로 제목 바꾸고,
카테고리에 맞는 입력 칸 추가*/
const selectForm = document.querySelector('#category')
//000작성으로 제목 바꾸기
selectForm.addEventListener('change',()=>{
    const title = document.querySelector('.doc-title')
    const options = selectForm.options
    const index = selectForm.options.selectedIndex
    title.textContent = `${options[index].value} 작성`
})


/*2. (change 활용)발행예약 체크 시 -> 발생 시간 설정 띄우기*/
const inputSettime = document.querySelector('#settime')
const parentP = document.querySelector('.settime-parent')
inputSettime.addEventListener('change',()=>{
    if(inputSettime.checked){//발생 시간 설정 생성
        const newLabel = document.createElement('label')
        newLabel.setAttribute("for","time")
        newLabel.setAttribute("id","label-time")
        newLabel.textContent = ": 발행시간 설정 "
        const newInput = document.createElement('input')
        newInput.setAttribute("type","datetime-local")
        newInput.setAttribute("id","input-time")
        parentP.appendChild(newLabel)
        parentP.appendChild(newInput)
    }else{//발생 시간 설정 제거
        const delLabel = document.querySelector("#label-time")
        const delInput = document.querySelector("#input-time")
        delLabel.parentNode.removeChild(delLabel)
        delInput.parentNode.removeChild(delInput)
    }
})


/*3. (keyup 활용)비밀번호 잘못된 입력 처리*/
//1) 비밀번호 활성화를 안 한 상태에서 keyup할 때 -> 경고문('비밀번호를 활성화해주세요.')
//2) 4글자 이상 입력 시 -> 경고문('숫자 네 자리만 입력해주세요.')
//3) 숫자가 아닌 것을 입력했을 때 -> 경고문('숫자만 입력해주세요.')
//4) 올바르게 입력했을 때 -> 출력문('사용 가능한 비밀번호 입니다.')
const inputOnOff = document.querySelector('#setpassword')
const inputpassword = document.querySelector('#password')
const warning = document.querySelector('.warning') 
inputpassword.addEventListener('keyup',()=>{
    warning.style.color="red"
    if(!inputOnOff.checked){
        warning.textContent = '비밀번호를 활성화해주세요.'
    }else if(inputpassword.value.length>4){
        warning.textContent = '숫자 네 자리만 입력해주세요.'
    }else if(isNaN(Number(inputpassword.value))){
        warning.textContent = '숫자만 입력해주세요.'
    }else if(inputpassword.value.length===4){
        warning.textContent='사용 가능한 비밀번호 입니다.'
        warning.style.color="blue"
    }else{
        warning.textContent=''
    }
})


/*4. (change 활용)오늘의 기분 선택 박스->적절한 멘트 출력*/
const selectFeeling = document.querySelector('#feeling')
const pResponse = document.querySelector('.response-feeling')
selectFeeling.addEventListener('change',()=>{
    const options = selectFeeling.options
    const index = selectFeeling.options.selectedIndex
    switch(index){
        case 0:
            pResponse.textContent = '  너무 좋은 하루였네요! 내일도 좋은 하루되길 바랄게요:)'
            break
        case 1:
            pResponse.textContent = '  일상의 행복을 느낀 하루였네요! 남은 하루동안은 더 좋은 일만 생길 거예요:)'
            break
        case 2:
            pResponse.textContent = '  힘들었겠네요.. 오늘 하루 마무리 하느라 고생하셨어요 내일은 좋은 일이 있길 응원해요:)'
    }
})


/*5. 제출 후 상호작용: 1)제출(저장) 막기 2)제목과 내용 미리보기*/
const submitButton = document.querySelector('#submit')
submitButton.addEventListener('click',(event)=>{
    event.preventDefault()//제출 막기
    //저장버튼 아래에 제목과 내용 띄우기+작성 박스 크기(css) 키우기
    const writtenTitle = document.querySelector('#write-title')
    const writtenContent = document.querySelector('#write-content')
    const reloadTitle = document.querySelector('.reloadTitle')
    const reloadContent = document.querySelector('.reloadContent')
    if (writtenTitle && reloadTitle) {
        reloadTitle.textContent = writtenTitle.value || '제목이 없습니다.';
    }
    if (writtenContent && reloadContent) {
        reloadContent.textContent = writtenContent.value || '내용이 없습니다.';
    }
    const boxsize = document.querySelector('#write-main')
    const heightSize = 700 + (writtenContent.value.length)/1.9 //입력된 내용에 비례하여 box크기 조정
    boxsize.style.gridTemplateRows = `150px 250px ${heightSize}px`
})