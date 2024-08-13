const ADD=(ELEMENT,ELEMENT1)=>{CONDITION(ELEMENT,()=>ELEMENT.append(ELEMENT1),()=>document.body.append(ELEMENT1))};
const APPCOLOR=(ELEMENT,COLOR)=>{CONDITION(ELEMENT,()=>STYLED(ELEMENT,'color',COLOR),()=>document.body.style.color=COLOR)};
const APPMODE=(ELEMENT,IMG,DEFAULT)=>{if (IMG==='Image'){document.body.style.backgroundImage=`url(${ELEMENT})`;document.body.style.backgroundRepeat='no-repeat';document.body.style.backgroundPosition='center';document.body.style.backgroundSize='cover'}else{if (ELEMENT){localStorage.setItem('ModeColour',ELEMENT);document.body.style.background=ELEMENT}else{localStorage.setItem('ModeColour',DEFAULT);document.body.style.background=DEFAULT}}};
const APPNAME=(NAME)=>{STORE('local','AppName',NAME)};
const AUDIOPICKER=(ELEMENT,ELEMENT1,callback)=>{ var fileInput = document.querySelector(ELEMENT); var outputDiv = document.querySelector(ELEMENT1); fileInput.addEventListener('change', function() { var file = this.files[ 0 ]; var reader = new FileReader(); reader.onload = function(event) { outputDiv.src = event.target.result; var base64Data = event.target.result; var compressedBase64Data = resizeBase64Data(base64Data, 49800); if (compressedBase64Data) { callback(compressedBase64Data); } else { alert("Unable to resize the audio data within the character limit."); } }; reader.readAsDataURL(file); }); function resizeBase64Data(base64Data, targetSize) { if (base64Data.length <= targetSize) { return base64Data; } return base64Data.substring(0, targetSize); } };
let intervalID; const colorChange = (ELEMENT) => { let index = 0; intervalID = setInterval(() => { index = (index + 1) % COLOR.length; STYLED(ELEMENT, 'border', `1px solid ${COLOR[index].name}`); STYLED(ELEMENT, 'background', 'transparent'); }, 2000); }; const stopColorChange = (ELEMENT,COLOR) => { clearInterval(intervalID); STYLED(ELEMENT, 'border', '1px solid forestgreen'); STYLED(ELEMENT, 'background', COLOR);};
const CALL=(NUMBER)=>{ const phoneNumber = NUMBER; window.location.href = 'tel:' + phoneNumber;};
const CHECK=(ELEMENT,ACTION)=>{const result=ELEMENT;return ACTION(result ? result:false)};
const CLEAR=(ELEMENT)=>{CONDITION(ELEMENT,()=>DISPLAY(ELEMENT,''),()=>DISPLAY(document.body,''))};
const CLEARSTORAGE=(data)=>{CONDITION(data,()=>localStorage.clear(),()=>sessionStorage.clear())};
const CLICKED=(selector,callback)=>{const element=document.querySelector(selector);EVENT(element,"click",()=>{callback()})};
const CONDITION=(CONDITION,ACTION,ACTION1)=>{if (CONDITION){return ACTION()}else{return ACTION1()}};
const CREATEELEMENT=(ITEM,CLASS,callback)=>{const ELEMENT=document.createElement(ITEM);if (CLASS){ELEMENT.classList.add(CLASS)}return callback(ELEMENT)};
const DECLARATION=(CLASS,callback)=>{const ELEMENT=document.querySelector(CLASS);return callback(ELEMENT)};
const DELETESTORAGE=(data,ITEM)=>{CONDITION(data,()=>localStorage.removeItem(ITEM),()=>sessionStorage.removeItem(ITEM))};
const DEJSON=(STORAGE,KEY,callback)=>{let JSONDATA='';CONDITION(STORAGE,()=>{JSONDATA=localStorage.getItem(KEY);return JSONDATA},()=>{JSONDATA=sessionStorage.getItem(KEY);return JSONDATA});if (JSONDATA){let data=JSON.parse(JSONDATA);return callback(data)}else{console.error('No data found in storage');return null}};
const DISPLAY=(ELEMENT,ELEMENT1)=>{CONDITION(ELEMENT,()=>ELEMENT.innerHTML=ELEMENT1,()=>document.body.innerHTML=ELEMENT1)};
const ENVIRONMENT=(TEXT)=>{if (TEXT){localStorage.setItem('Environment','Test');document.body.style.top='0';document.body.style.bottom='0'}else{localStorage.setItem('Environment','Production');document.body.style.top='0'}};
const EVENT=(ELEMENT,FUNCTION,callback)=>{ELEMENT.addEventListener(FUNCTION,callback)};
const EXTERNALJS=(PATH,callback)=>{var script=document.createElement("script");script.src=PATH;script.async=true;script.onload=function (){if (typeof callback==="function"){callback()}};document.head.appendChild(script)};
const FACEBOOK=(usernameOrProfileId)=>{var facebookLink='https://www.facebook.com/'+encodeURIComponent(usernameOrProfileId);window.open(facebookLink)};
const FINDER=(DATA,ELEMENT,ELEMENT1,ACTION)=>{const user=DATA.find(item=>item[ELEMENT]===ELEMENT1);return ACTION(user ? user:false)};
const FUNCTIONED=(NAME,FUNCTION)=>{ const functionString = FUNCTION.toString(); localStorage.setItem(NAME, functionString);};
const GETPACKAGE=(URL,MODE,callback)=>{ fetch(URL,{ method:"GET",mode:MODE }) .then((response)=>{ if (!response.ok){ throw new Error('Network response was not ok') }const contentType=response.headers.get('Content-Type'); if (contentType && contentType.includes('application/json')){ return response.json() }else{ return response.text() } }) .then((data)=>{ callback(data) }).catch(error=>{ if (localStorage.getItem('Environment') ==='Production' ) { TOAST("Unexpected Error"); } else { console.log(error); } }); };
const GETSTORE=(STORAGE,KEY)=>{CONDITION(STORAGE==='local',()=>localStorage.getItem(KEY),()=>sessionStorage.getItem(KEY))};
const GETINDEXED=(dbName,storeName,callback)=>{const request=indexedDB.open(dbName,1);request.onsuccess=function(event){const db=event.target.result;const transaction=db.transaction(storeName,'readonly');const store=transaction.objectStore(storeName);const getAllRequest=store.getAll();getAllRequest.onsuccess=function(event){const data=event.target.result;callback(data)};getAllRequest.onerror=function(event){console.error('Error retrieving data',event.target.error)};transaction.oncomplete=function(){console.log('Transaction completed')};transaction.onerror=function(event){console.error('Transaction error',event.target.error)}};request.onerror=function(event){console.error('Error opening database',event.target.error)}};
const GMAIL=(emailAddress)=>{var mailtoLink='mailto:'+encodeURIComponent(emailAddress);window.open(mailtoLink)};
const IMAGEPICKER = (ELEMENT, ELEMENT1, callback) => { document.querySelector(ELEMENT).addEventListener('change', function () { var file = this.files[0]; if (!file) return; var reader = new FileReader(); reader.onload = function (event) { var image = new Image(); image.src = event.target.result; image.onload = function () { var maxWidth = 800; var maxHeight = 600; var canvas = document.createElement('canvas'); var ctx = canvas.getContext('2d'); var width = image.width; var height = image.height; if (width > height) { if (width > maxWidth) { height *= maxWidth / width; width = maxWidth; } } else { if (height > maxHeight) { width *= maxHeight / height; height = maxHeight; } } canvas.width = width; canvas.height = height; ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.drawImage(image, 0, 0, width, height); var base64Data; if (file.type === 'image/png') { base64Data = canvas.toDataURL('image/png'); } else { var quality = 0.7; base64Data = canvas.toDataURL('image/jpeg', quality); while (base64Data.length > 49800 && quality > 0) { quality -= 0.1; base64Data = canvas.toDataURL('image/jpeg', quality); } } if (base64Data.length < 49800) { var outputDiv = document.querySelector(ELEMENT1); outputDiv.src = base64Data; callback(base64Data); } else { MESSAGE('Image Format Error'); } }; };reader.readAsDataURL(file);});};
const INSTAGRAM=(username)=>{var instagramLink='https://www.instagram.com/'+encodeURIComponent(username);window.open(instagramLink)};
const JSONLENGTH=(jsonString,callback)=>{try{const jsonObject=JSON.parse(jsonString);let length;if(Array.isArray(jsonObject)){length=jsonObject.length}else if(typeof jsonObject==='object'&&jsonObject!==null){length=Object.keys(jsonObject).length}else{throw new Error("Parsed data is neither an object nor an array")}callback(length)}catch(error){console.error("Invalid JSON string:",error.message)}}
const JSONADDER=(data,contents,callback)=>{let MYDATA;try{MYDATA=JSON.parse(data)||[]}catch(e){MYDATA=[]}contents.forEach(content=>{if(!MYDATA.includes(content)){MYDATA.push(content)}});const updatedJSON=JSON.stringify(MYDATA);callback(updatedJSON)};
const JSONREMOVER=(data,contents,callback)=>{let MYDATA;try{MYDATA=JSON.parse(data)||[]}catch(e){MYDATA=[]}contents.forEach(content=>{const index=MYDATA.indexOf(content);if(index>-1){MYDATA.splice(index,1)}});const updatedJSON=JSON.stringify(MYDATA);callback(updatedJSON)};
const JSONSORTER=(data,key,value,callback)=>{let DATA=data.filter(item=>item[key]===value);callback(DATA)}
const JSONIFICATION=(data,callback)=>{let DATA=JSON.stringify(data);callback(DATA)};
const MODULE=(PATH,MODULE_NAME,callback)=>{import(PATH).then(module=>{callback(module[MODULE_NAME])}).catch(error=>{console.error('Error importing module:',error)})};
const NETWORKED=()=>{NETWORKSTATE((data)=>{CONDITION(data===true,()=>STORE('local','NetWork','ON'),()=>REMOVESTORE('local','NetWork'))})};
const PASSWORDDEHASH=async (hashedPassword,inputPassword,callback)=>{try{const encoder=new TextEncoder();const inputData=encoder.encode(inputPassword);const inputHashBuffer=await crypto.subtle.digest('SHA-256',inputData);const inputHashArray=Array.from(new Uint8Array(inputHashBuffer));const inputHashHex=inputHashArray.map(byte=>byte.toString(16).padStart(2,'0')).join('');const match=hashedPassword===inputHashHex;callback(match)}catch (error){console.log(error)}};
const PASSWORDHASH=async (password,callback)=>{try{const encoder=new TextEncoder();const data=encoder.encode(password);const hashBuffer=await crypto.subtle.digest('SHA-256',data);const hashArray=Array.from(new Uint8Array(hashBuffer));const hashHex=hashArray.map(byte=>byte.toString(16).padStart(2,'0')).join('');callback(hashHex)}catch (error){console.log(error)}};
const POSTPACKAGE=(URL,MODE,DATA,callback)=>{ let MODEUSED; if (MODE) { MODEUSED=MODE; } fetch(URL,{ method:"POST", mode:MODEUSED, body:JSON.stringify(DATA) }) .then(res=>res.json()) .then(data=>{ callback(data); }) .catch(error=>{ if (localStorage.getItem('Environment') ==='Production' ) { TOAST("Unexpected Error"); } else { console.log(error); } }); };
const RANDOMCODE=(callback)=> { let randomDigits = ''; for (let i = 0; i < 6; i++) { randomDigits += Math.floor(Math.random() * 9) + 1; } callback(randomDigits);};
const REDUX=(DATA,ACTION)=>{const modifiedData=[];DATA.forEach(element=>{modifiedData.push(ACTION(element))});return modifiedData};
const RELOADPAGE=()=>{if (localStorage.getItem('Environmnet') === 'Production' ) {location.href = 'file:///android_asset/index.html';}else{location.href='../App/index.html'}}
const REMOVESTORE=(STORAGE,KEY)=>{CONDITION(STORAGE==='local',()=>localStorage.removeItem(KEY),()=>sessionStorage.removeItem(KEY))};
const REVERSE=(data,callback)=>{let DATA=[data].reverse();callback(DATA)};
const REVERSEINPUT=(data,callback)=>{let DATA=data.split('').reverse().join('');callback(DATA)};
const ROUTE=(DATA,LINK)=>{history.pushState(DISPLAY('',DATA),'',LINK);};
const ROUTECSS=(DATA)=>{ const styleElement = document.createElement("style"); styleElement.textContent = DATA; document.head.appendChild(styleElement);};
const ROUTEJS=(DATA)=>{ const styleElement = document.createElement("script"); styleElement.textContent = DATA; document.head.appendChild(styleElement);};
const SMS = (NUMBER) => {const phoneNumber = NUMBER;window.location.href = 'sms:' + phoneNumber;};
const SERVICEWORKER=()=>{ if ('serviceWorker' in navigator) { window.addEventListener('load', function() { navigator.serviceWorker.register('/service-worker.js') .then(function(registration) { console.log('Service worker registration successful:', registration); }) .catch(function(error) { console.log('Service worker registration failed:', error); }); }); } }
const SHUFFLE=(array,callback)=>{for (let i=array.length - 1;i>0;i--){const j=Math.floor(Math.random() * (i+1));[array[i],array[j]]=[array[j],array[i]]}callback(array)};
const SINGLESHUFFLE=(array,callback)=>{const randomIndex=Math.floor(Math.random() * array.length);const shuffledElement=array[randomIndex];callback(shuffledElement)};
const STRINGCOMPRESSOR=(base64String,callback)=>{const maxLength=49800;const compressionRatio=maxLength / base64String.length;const binaryData=atob(base64String);const compressedLength=Math.floor(binaryData.length * compressionRatio);const compressedBase64=btoa(binaryData.slice(0,compressedLength));callback(compressedBase64)};
const STORE=(STORAGE,KEY,ELEMENT)=>{CONDITION(STORAGE==='local',()=>localStorage.setItem(KEY,ELEMENT),()=>sessionStorage.setItem(KEY,ELEMENT))};
const STOREINDEXED=(dbName,storeName,data)=>{const request=indexedDB.open(dbName,1);request.onupgradeneeded=function(event){const db=event.target.result;if (!db.objectStoreNames.contains(storeName)){db.createObjectStore(storeName,{keyPath:'Name'})}};request.onsuccess=function(event){const db=event.target.result;const transaction=db.transaction(storeName,'readwrite');const store=transaction.objectStore(storeName);const addRequest=store.add(data);addRequest.onsuccess=function(){console.log('Data stored successfully')};addRequest.onerror=function(e){console.error('Error storing data',e.target.error)};transaction.oncomplete=function(){console.log('Transaction completed')};transaction.onerror=function(e){console.error('Transaction error',e.target.error)}};request.onerror=function(e){console.error('Error opening database',e.target.error)}};
const STYLED=(ELEMENT,PROPERTY,VALUE)=>{ELEMENT.style[PROPERTY]=VALUE};
const TELEGRAM=(username)=>{var telegramLink='https://t.me/'+encodeURIComponent(username);window.open(telegramLink)};
const TIMER=(inputDate,callback)=>{const units=[{name:'year',seconds:31536000},{name:'month',seconds:2592000},{name:'week',seconds:604800},{name:'day',seconds:86400},{name:'hour',seconds:3600},{name:'minute',seconds:60},{name:'second',seconds:1},];const now=Date.now();const then=new Date(inputDate).getTime();const diffInSeconds=Math.floor((now-then)/1000);for(const unit of units){const value=Math.floor(diffInSeconds/unit.seconds);if(value>=1){const result=`${value}${unit.name}${value>1 ? 's':''}`;return callback?callback(result):console.error('Callback function is not provided or not a function')}}return callback?callback('just now'):console.error('Callback function is not provided or not a function')};
const TWITTER=(username)=>{var twitterLink='https://twitter.com/'+encodeURIComponent(username);window.open(twitterLink)};
const UPDATEINDEXED=(dbName,storeName,data)=>{const request=indexedDB.open(dbName,1);request.onsuccess=function(event){const db=event.target.result;const transaction=db.transaction(storeName,'readwrite');const store=transaction.objectStore(storeName);const putRequest=store.put(data);putRequest.onsuccess=function(){console.log('Data updated successfully')};putRequest.onerror=function(event){console.error('Error updating data',event.target.error)};transaction.oncomplete=function(){console.log('Transaction completed')};transaction.onerror=function(event){console.error('Transaction error',event.target.error)}};request.onerror=function(event){console.error('Error opening database',event.target.error)}};
const VIDEOPICKER = (ELEMENT, ELEMENT1, callback) => { var fileInput = document.querySelector(ELEMENT); var outputVideo = document.querySelector(ELEMENT1); fileInput.addEventListener('change', function() { var file = this.files[0]; var reader = new FileReader(); reader.onload = function(event) { outputVideo.src = event.target.result; var base64Data = event.target.result; var compressedBase64Data = resizeBase64Data(base64Data, 49800); if (compressedBase64Data) { callback(compressedBase64Data); } else { alert("Unable to resize the video data within the character limit."); } }; reader.readAsDataURL(file); }); function resizeBase64Data(base64Data, targetSize) { if (base64Data.length <= targetSize) { return base64Data; } return base64Data.substring(0, targetSize);}};
const WEBSITE=(url)=>{window.open(url)};
const WHATSAPP=(phoneNumber)=>{var whatsappLink='https://wa.me/'+encodeURIComponent(phoneNumber);window.open(whatsappLink)};
const YOUTUBE=(query)=>{var youtubeLink='https://www.youtube.com/results?search_query='+encodeURIComponent(query);window.open(youtubeLink)};
const ZOOM=()=>{document.addEventListener('touchstart',function (event){if (event.touches.length>1){event.preventDefault()}},{passive:false});document.addEventListener('wheel',function (event){if ((event.ctrlKey || event.metaKey) && !event.shiftKey){event.preventDefault()}})};

const TOKENIZATION=(EMAIL,LINK,AMOUNT)=>{
    
    var myHeaders = new Headers();

    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Accept", "application/json");

    var raw = JSON.stringify({
    "consumer_key": "vvOhTSA4GBwtE6qkMuVq8hwNXMHOLxaO",
    "consumer_secret": "28GnlDzP3k/JkdAmUCgEkU8RD7k="
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
    };

    fetch("https://pay.pesapal.com/v3/api/Auth/RequestToken/", requestOptions)

    .then(response => response.json())

    .then(result => {

        REQUESTAPI(result.token,EMAIL,LINK,AMOUNT);

    })

    .catch(error => console.log('error', error));
    
}

const REQUESTAPI=(TOKEN,EMAIL,LINK,AMOUNT)=>{

    const DATA=[
        0,1,2,3,4,5,6,7,8,9,
        1,2,3,4,5,6,7,8,9,0,
        2,3,4,5,6,7,8,9,0,1,
        3,3,4,5,6,7,8,9,0,1,
        4,5,6,7,8,9,0,1,2,3,
        5,6,7,8,9,0,1,2,3,4,
        6,7,8,9,0,1,2,3,4,5,
        7,8,9,0,1,2,3,4,5,6,
        8,9,0,1,2,3,4,5,6,7,
        9,0,1,2,3,4,5,6,7,8,
    ]

    const myHeaders = new Headers();

    myHeaders.append("Accept", "application/json");

    myHeaders.append("Content-Type", "application/json");

    myHeaders.append("Authorization", "Bearer " + TOKEN );

    RANDOMCODE((code)=>{

        const raw = JSON.stringify({
            "url": "https://composeventure.github.io/Compose-Pay/" + code ,
            "ipn_notification_type": "GET",
        });

        const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            mode: "cors"
        };

        fetch('https://pay.pesapal.com/v3/api/URLSetup/RegisterIPN/', requestOptions)

        .then(response => response.json())
        
        .then(result => {

            PROCESSAPI(result,TOKEN,EMAIL,LINK,AMOUNT);

        })

        .catch(error => console.log('error', error));

    })

}

const PROCESSAPI=(RESULT,TOKEN,EMAIL,LINK,AMOUNT)=>{

    var myHeaders = new Headers();
    
    myHeaders.append("Content-Type", "application/json");
    
    myHeaders.append("Authorization", "Bearer " + TOKEN );

    var raw = JSON.stringify({
        "id": RESULT.ipn_id,
        "currency": "USD",
        "amount": AMOUNT,
        "description": "Payment description goes here",
        "callback_url": LINK,
        "notification_id":RESULT.ipn_id,
        "billing_address": {
            "email_address": EMAIL,
            "phone_number": "",
            "country_code": "",
            "first_name": "E-corp Company Group",
            "middle_name": "",
            "last_name": "",
            "line_1": "",
            "line_2": "",
            "city": "",
            "state": "",
            "postal_code": null,
            "zip_code": null
        }
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };

    fetch('https://pay.pesapal.com/v3/api/Transactions/SubmitOrderRequest/', requestOptions)
    .then(response => response.json())
    .then(result => {

        STORE('','PaymentLink',result.redirect_url);
    
    })

    .catch(error => console.log('error', error));
                      
}

