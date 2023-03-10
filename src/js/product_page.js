const HOST = 'http://localhost:3000';
const COLOR_2 = '#564fff';

// HEADER

// Login visualization in header when visiting the site

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('isLoggedIn')) {
        doLogin();
        checkToken();
    }
});

function checkToken() {
    fetch(`${HOST}/api/check_token`, {
        method: 'GET', 
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async (res) => {
        if (res.status !== 200) {
            localStorage.setItem('isLoggedIn', 'false');
            doExit();
        }
    })
    .catch((error) => {
        localStorage.setItem('isLoggedIn', 'false');
        doExit();

        console.error('Check token error');
    });
}

// Show contacts

const $body = document.querySelector('body')
const $HeaderContactsBtn = $body.querySelector('.left-row__state-btn');
const $HeaderContactsList = $body.querySelector('.left-row__state-list');

$HeaderContactsBtn.addEventListener('click', () => {
    $HeaderContactsList.classList.toggle('_shown');
});

window.addEventListener('click', (event) => {
    if ($HeaderContactsList.classList.contains('_shown')) {
        if (!(event.target.closest('.left-row__state-list') || event.target.closest('.left-row__state-btn'))) {
            $HeaderContactsList.classList.remove('_shown');
        }
    }
});

// Languages

const $headerLanguage = $body.querySelector('.header__languages');
const $headerLanguageEn = $body.querySelector('.header__languages .languages__en');
const $headerLanguageRu = $body.querySelector('.header__languages .languages__ru');

let currentLanguage = localStorage.getItem('currentLanguage') || 'en';

if (currentLanguage !== 'en') {
    $headerLanguageEn.classList.remove('languages__selected');
    $headerLanguageEn.classList.add('languages__not-selected');

    $headerLanguageRu.classList.remove('languages__not-selected');
    $headerLanguageRu.classList.add('languages__selected');
}

setTimeout(() => {
    $headerLanguageEn.style.transitionDuration = '300ms';
    $headerLanguageRu.style.transitionDuration = '300ms';
}, 500);


languageChanges();

$headerLanguage.addEventListener('click', () => {
    if (currentLanguage === 'en') {
        localStorage.setItem('currentLanguage', 'ru');
        currentLanguage = 'ru';

        $headerLanguageEn.classList.remove('languages__selected');
        $headerLanguageEn.classList.add('languages__not-selected');

        $headerLanguageRu.classList.remove('languages__not-selected');
        $headerLanguageRu.classList.add('languages__selected');
    } else {
        localStorage.setItem('currentLanguage', 'en');
        currentLanguage = 'en';

        $headerLanguageRu.classList.remove('languages__selected');
        $headerLanguageRu.classList.add('languages__not-selected');

        $headerLanguageEn.classList.remove('languages__not-selected');
        $headerLanguageEn.classList.add('languages__selected');
    }

    languageChanges();
});

function languageChanges() {
    const $enTextArray = $body.querySelectorAll('.en');
    const $ruTextArray = $body.querySelectorAll('.ru');

    if (currentLanguage === 'en') {
        $enTextArray.forEach($item => {
            $item.classList.add('_show');

            if ($item.classList.contains('_hide')) {
                $item.classList.remove('_hide');
            }
        });

        $ruTextArray.forEach($item => {
            $item.classList.add('_hide');

            if ($item.classList.contains('_show')) {
                $item.classList.remove('_show');
            }
        });
    } else {
        $ruTextArray.forEach($item => {
            $item.classList.add('_show');

            if ($item.classList.contains('_hide')) {
                $item.classList.remove('_hide');
            }
        });

        $enTextArray.forEach($item => {
            $item.classList.add('_hide');

            if ($item.classList.contains('_show')) {
                $item.classList.remove('_show');
            }
        });
    }
}

// Adoptive

const $headerBurgerButton = $body.querySelector('.burger__button');
const $headerBurgerList = $body.querySelector('.burger__list');
const $headerRightRow = $body.querySelector('.right-row');
const $headerRightRowReg = $headerRightRow.querySelector('.right-row__reg');
const $headerRightRowLog = $headerRightRow.querySelector('.right-row__log');
const $headerRightRowExit = $headerRightRow.querySelector('.right-row__exit');
const $headerRightRowAccount = $headerRightRow.querySelector('.right-row__account');
const $headerLeftRow = $body.querySelector('.left-row');
const $headerLeftRowLogo = $headerLeftRow.querySelector('.left-row__logo');
const $headerLeftRowTlg = $headerLeftRow.querySelector('.left-row__tlg');
const $headerLeftRowChat = $headerLeftRow.querySelector('.left-row__chat');
const $HeaderLeftRowContacts = $headerLeftRow.querySelector('.left-row__state');

if (document.documentElement.clientWidth <= 608) {
    headerAdoptiveLess880();
    headerAdoptiveLess608();
} else if (document.documentElement.clientWidth <= 880) {
    headerAdoptiveLess880();
}

window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth <= 608) {
        if ($headerRightRowReg.closest('.burger__list') && !$HeaderLeftRowContacts.closest('.burger__list')) {
            headerAdoptiveLess608();
        } else if (!$headerRightRowReg.closest('.burger__list')) {
            headerAdoptiveLess880();
            headerAdoptiveLess608();
        }
    } else if (document.documentElement.clientWidth <= 880) {
        if ($HeaderLeftRowContacts.closest('.burger__list')) {
            headerAdoptiveMore608();
        } else if (!$headerRightRowReg.closest('.burger__list')) {
            headerAdoptiveLess880();
        }
    } else {
        if ($headerRightRowReg.closest('.burger__list') && !$HeaderLeftRowContacts.closest('.burger__list')) {
            headerAdoptiveMore880();
        } else if ($HeaderLeftRowContacts.closest('.burger__list')) {
            headerAdoptiveMore608();
            headerAdoptiveMore880();
        }
    }
});


function headerAdoptiveLess880() {
    $headerBurgerList.append($headerRightRowReg);
    $headerBurgerList.append($headerRightRowLog);
    $headerBurgerList.append($headerRightRowExit);
    $headerBurgerList.append($headerRightRowAccount);
    $headerBurgerList.append($headerLeftRowTlg);
    $headerBurgerList.append($headerLeftRowChat);

    $headerRightRowReg.classList.add('burger__item');
    $headerRightRowLog.classList.add('burger__item');
    $headerRightRowExit.classList.add('burger__item');
    $headerRightRowAccount.classList.add('burger__item');
    $headerLeftRowTlg.classList.add('burger__item');
    $headerLeftRowChat.classList.add('burger__item');
}

function headerAdoptiveMore880() {
    $headerRightRow.append($headerRightRowReg);
    $headerRightRow.append($headerRightRowLog);
    $headerRightRow.append($headerRightRowExit);
    $headerRightRow.append($headerRightRowAccount);
    $headerLeftRow.append($headerLeftRowTlg);
    $headerLeftRow.append($headerLeftRowChat);

    $headerRightRowReg.classList.remove('burger__item');
    $headerRightRowLog.classList.remove('burger__item');
    $headerRightRowExit.classList.remove('burger__item');
    $headerRightRowAccount.classList.remove('burger__item');
    $headerLeftRowTlg.classList.remove('burger__item');
    $headerLeftRowChat.classList.remove('burger__item');
}

function headerAdoptiveLess608() {
    $headerBurgerList.append($HeaderLeftRowContacts);
    $HeaderLeftRowContacts.classList.add('burger__item');
}

function headerAdoptiveMore608() {
    $headerLeftRowLogo.after($HeaderLeftRowContacts);
    $HeaderLeftRowContacts.classList.remove('burger__item');
}

// Show burger list

$headerBurgerButton.addEventListener('click', () => {
    $headerBurgerList.classList.toggle('_show');

    if ($headerBurgerList.classList.contains('_show')) {
        $body.classList.add('_lock');
    } else {
        $body.classList.remove('_lock');
    }
});

window.addEventListener( 'click', (event) => {
    if ($headerBurgerList.classList.contains('_show')) {
        if (!event.target.closest('.burger') && !event.target.closest('.header__sign-up-popup')) {
            $headerBurgerList.classList.remove('_show');
            $body.classList.remove('_lock');
        }
    }
});

// Establishing a position burger list

$headerBurgerList.style.top = `${70 - document.documentElement.scrollTop}px`;
window.addEventListener('scroll', () => {
    $headerBurgerList.style.top = `${70 - document.documentElement.scrollTop}px`;
});

// SIGN UP

// Set width sign up

const $headerSignUpPopup = document.querySelector('.header__sign-up-popup');

window.addEventListener('resize', () => {
    $headerSignUpPopup.style.width = `${$body.clientWidth}px`
});

// Show sign up popup

//? $headerRightRowReg;
const $headerSignUpCloseBtn = $headerSignUpPopup.querySelector('.sign-up__close');


$headerRightRowReg.addEventListener('click', () => {
    $headerSignUpPopup.classList.toggle('_show');

    if ($headerSignUpPopup.classList.contains('_show')) {
        $body.classList.add('_lock');
    } else {
        $body.classList.remove('_lock');
    }
});

window.addEventListener( 'click', (event) => {
    if ($headerSignUpPopup.classList.contains('_show')) {
        if (!event.target.closest('.sign-up__container') && !event.target.closest('.right-row__reg')) {
            $headerSignUpPopup.classList.remove('_show');
            $body.classList.remove('_lock');
        }
    }
});

$headerSignUpCloseBtn.addEventListener('click', () => {
    if ($headerSignUpPopup.classList.contains('_show')) {
        $headerSignUpPopup.classList.remove('_show');
        $body.classList.remove('_lock');
    }
});

// Set position sign up

const $headerSignUpContainer = $headerSignUpPopup.querySelector('.sign-up__container');

if ($headerSignUpContainer.clientHeight + 40 > window.innerHeight) {
    $headerSignUpPopup.style.alignItems = 'flex-start';
    $headerSignUpPopup.style.marginTop = '20px';
} else {
    $headerSignUpPopup.style.alignItems = 'center';
    $headerSignUpPopup.style.marginTop = '0';
}

window.addEventListener('resize', () => {
    if ($headerSignUpContainer.clientHeight + 40 > window.innerHeight) {
        $headerSignUpPopup.style.alignItems = 'flex-start';
        $headerSignUpPopup.style.marginTop = '20px';
    } else {
        $headerSignUpPopup.style.alignItems = 'center';
        $headerSignUpPopup.style.marginTop = '0';
    }
})

// Register form Validation

const $headerSignUpFormReg = $headerSignUpPopup.querySelector('.sign-up__form-registration');
const $headerSignUpEmail = $headerSignUpFormReg.querySelector('.sign-up__email');
const $headerSignUpNickname = $headerSignUpFormReg.querySelector('.sign-up__nickname');
const $headerSignUpTlg = $headerSignUpFormReg.querySelector('.sign-up__tlg');
const $headerSignUpPassword = $headerSignUpFormReg.querySelector('.sign-up__password');
const $headerSignUpRepeatPassword = $headerSignUpFormReg.querySelector('.sign-up__repeat-password');
const $headerSignUpErrorMessage = $headerSignUpFormReg.querySelector('.sign-up__reg-error-message');

const $headerSignUpRegistration = $headerSignUpContainer.querySelector('.sign-up__registration');
const $headerSignUpActivation = $headerSignUpContainer.querySelector('.sign-up__activation');
const $headerSignUpBackBtn = $headerSignUpContainer.querySelector('.sign-up__back');
const $headerSignUpSubtitle = $headerSignUpContainer.querySelector('.sign-up__subtitle');
const $headerSignUpReorderBtn = $headerSignUpContainer.querySelector('.sign-up__reorder');
const $headerSignUpReorderCounter = $headerSignUpContainer.querySelector('.sign-up__reorder-counter');

let userEmail = '';

$headerSignUpFormReg.addEventListener('submit', (event) => {
    event.preventDefault();

    let errorMessage = '';

    if (!(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test($headerSignUpEmail.value))) {
        $headerSignUpEmail.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Incorrect email' : '???????????????????????? ?????????????????????? ??????????');
    }

    if (!(/^[a-zA-Z][a-zA-Z0-9-_\.]{1,20}$/.test($headerSignUpNickname.value))) {
        $headerSignUpNickname.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'The nickname must start with a Latin letter, contain only Latin letters and numbers, and may contain the symbols -,_,.' : '?????????????? ???????????? ???????????????????? ?? ?????????????????? ??????????, ?????????????????? ???????????? ?????????????????? ?????????? ?? ??????????, ?????????? ?????????????????? ?????????????? -,_,.');
    }

    if (!stringLengthCheck($headerSignUpNickname.value, 6)) {
        $headerSignUpNickname.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Nickname less than 6 characters' : '?????????????? ???????????? 6 ????????????????');
    }

    if (!(/^[@]{1}[^??-????]+$/.test($headerSignUpTlg.value))) {
        $headerSignUpTlg.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Incorrect telegram' : '???????????????????????? ????????????????');
    }

    if (!stringLengthCheck($headerSignUpTlg.value, 2)) {
        $headerSignUpTlg.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Telegram less than 2 characters' : '???????????????? ???????????? 2 ????????????????');
    }

    if (!(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/.test($headerSignUpPassword.value))) {
        $headerSignUpPassword.style.border = '1px solid red';
        $headerSignUpRepeatPassword.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Password must contain latin letters and numbers' : '???????????? ???????????? ?????????????????? ?????????????????? ?????????? ?? ??????????');
    }

    if (!stringLengthCheck($headerSignUpPassword.value, 6)) {
        $headerSignUpPassword.style.border = '1px solid red';
        $headerSignUpRepeatPassword.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Password less than 6 characters' : '???????????? ???????????? 6 ????????????????');
    }

    if ($headerSignUpPassword.value !== $headerSignUpRepeatPassword.value) {
        $headerSignUpPassword.style.border = '1px solid red';
        $headerSignUpRepeatPassword.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Passwords do not match' : '???????????? ???? ??????????????????');
    }

    if (errorMessage) {
        $headerSignUpErrorMessage.textContent = errorMessage;
    } else {
        if ($headerSignUpErrorMessage.textContent) {
            $headerSignUpErrorMessage.textContent = '';
        }

        // Query send for register

        fetch(`${HOST}/api/send_email_code`, {
            method: 'POST', 
            body: JSON.stringify({
                email: $headerSignUpEmail.value,
                nickname: $headerSignUpNickname.value,
                tlg: $headerSignUpTlg.value,
                pass: $headerSignUpPassword.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            const status = res.status;
            const data = await res.json();
            if (status !== 200) {
                try {
                    $headerSignUpErrorMessage.textContent = (currentLanguage === 'en') ? data.en : data.ru;
                } catch (error) {
                    console.error('Error: ' + error);
                }
            } else {
                userEmail = $headerSignUpEmail.value;

                $headerSignUpEmail.value = '';
                $headerSignUpNickname.value = '';
                $headerSignUpTlg.value = '';
                $headerSignUpPassword.value = '';
                $headerSignUpRepeatPassword.value = '';

                $headerSignUpEmail.style.border = `2px solid ${COLOR_2}`;
                $headerSignUpNickname.style.border = `2px solid ${COLOR_2}`;
                $headerSignUpTlg.style.border = `2px solid ${COLOR_2}`;
                $headerSignUpPassword.style.border = `2px solid ${COLOR_2}`;
                $headerSignUpRepeatPassword.style.border = `2px solid ${COLOR_2}`;

                $headerSignUpRegistration.classList.add('_hidden');
                $headerSignUpActivation.classList.add('_shown');
                $headerSignUpBackBtn.classList.add('_shown');

                $headerSignUpCodeError.textContent = (currentLanguage === 'en') ? data.en : data.ru;
                $headerSignUpSubtitle.textContent = (currentLanguage === 'en') ? `Email with code sent ${userEmail}` : `?????????????????? ?? ?????????? ???????????????????? ???? ?????????? ${userEmail}`

                makeSendButtonInactive($headerSignUpReorderCounter, $headerSignUpReorderBtn);
            }
        })
        .catch((error) => {
            $headerSignUpErrorMessage.textContent = (currentLanguage === 'en') ? 'Unexpected error' : '???????????????????????????? ????????????';    
            console.error('Fetch error');
        });
    }
});

// Remove red border by focus registration input

removeRedBorder($headerSignUpEmail);
removeRedBorder($headerSignUpNickname);
removeRedBorder($headerSignUpTlg);
removeRedBorder($headerSignUpPassword);
removeRedBorder($headerSignUpRepeatPassword);

function removeRedBorder($input) {
    $input.addEventListener('focus', () => {
        $input.style.border = `2px solid ${COLOR_2}`;
    });
}

function stringLengthCheck(str, len) {
    return str.length >= len;
}

// Return to the registration form on the button

let resendMessageCounterForSingUp;

$headerSignUpBackBtn.addEventListener('click', () => {
    $headerSignUpRegistration.classList.remove('_hidden');
    $headerSignUpActivation.classList.remove('_shown');
    $headerSignUpBackBtn.classList.remove('_shown');

    clearInterval(resendMessageCounterForSingUp);
    $headerSignUpReorderCounter.textContent = '';
    if ($headerSignUpReorderBtn.classList.contains('_disabled')) {
        $headerSignUpReorderBtn.classList.remove('_disabled');
    }
});

// Send email-code again

const $headerSignUpFormActv = $headerSignUpPopup.querySelector('.sign-up__form-activation');
const $headerSignUpCodeInput = $headerSignUpFormActv.querySelector('.sign-up__code');
const $headerSignUpCodeError = $headerSignUpFormActv.querySelector('.sign-up__code-error-message');

$headerSignUpReorderBtn.addEventListener('click', () => {
    if (!$headerSignUpReorderBtn.classList.contains('_disables')) {
        resendMessageCounterForSingUp = makeSendButtonInactive($headerSignUpReorderCounter, $headerSignUpReorderBtn);

        fetch(`${HOST}/api/send_code_again`, {
            method: 'POST', 
            body: JSON.stringify({
                email: userEmail,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            const status = res.status;
            const data = await res.json();

            if (status !== 200) {
                try {
                    $headerSignUpCodeError.textContent = (currentLanguage === 'en') ? data.en : data.ru;

                    clearInterval(resendMessageCounterForSingUp);
                    $headerSignUpReorderCounter.textContent = '';
                    if ($headerSignUpReorderBtn.classList.contains('_disabled')) {
                        $headerSignUpReorderBtn.classList.remove('_disabled');
                    }
                } catch (error) {
                    console.error('Error: ' + error);
                }
            }
        })
        .catch((error) => {
            $headerSignUpCodeError.textContent = (currentLanguage === 'en') ? 'Unexpected error' : '???????????????????????????? ????????????';    
            console.error('Fetch error');
        });
    }
});

// Activation form Validation

$headerSignUpFormActv.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!(/^[0-9]{6}$/.test($headerSignUpCodeInput.value))) {
        $headerSignUpCodeInput.style.border = `1px solid red`;

        $headerSignUpCodeError.textContent = (currentLanguage === 'en') ? 'Incorrect code' : '???????????????? ??????';
    } else {
        fetch(`${HOST}/api/sign_in`, {
            method: 'POST', 
            credentials: 'include',
            body: JSON.stringify({
                email: userEmail,
                code: $headerSignUpCodeInput.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            const status = res.status;
            const data = await res.json();

            if (status !== 200) {
                try {
                    $headerSignUpCodeError.textContent = (currentLanguage === 'en') ? data.en : data.ru;
                } catch (error) {
                    console.error('Error: ' + error);
                }
            } else {
                localStorage.setItem('isLoggedIn', 'true');
                
                doLogin();

                $headerSignUpCodeInput.value = '';
                $headerSignUpCodeInput.style.border = `2px solid ${COLOR_2}`;
                $headerSignUpCodeError.textContent = '';

                $headerSignUpRegistration.classList.remove('_hidden');
                $headerSignUpActivation.classList.remove('_shown');
                $headerSignUpBackBtn.classList.remove('_shown');

                $headerSignUpPopup.classList.remove('_show');
                $body.classList.remove('_lock');

                clearInterval(resendMessageCounterForSingUp);
                $headerSignUpReorderCounter.textContent = '';
                if ($headerSignUpReorderBtn.classList.contains('_disabled')) {
                    $headerSignUpReorderBtn.classList.remove('_disabled');
                }
            }
        })
        .catch((error) => {
            $headerSignUpCodeError.textContent = (currentLanguage === 'en') ? 'Unexpected error' : '???????????????????????????? ????????????';    
            console.error('Fetch error');
        });
    }
});

// Make the send button inactive

function makeSendButtonInactive($counter, $btn) {
    $btn.classList.add('_disabled');

    let countOfSeconsd = 2 * 60;

    $counter.textContent = `${Math.floor(countOfSeconsd / 60)}:${(countOfSeconsd % 60 > 9) ? countOfSeconsd % 60 : '0' + countOfSeconsd % 60}`;

    const interval = setInterval(() => {
        countOfSeconsd -= 1;

        if (!countOfSeconsd) {
            clearInterval(interval);
            $counter.textContent = '';
            if ($btn.classList.contains('_disabled')) {
                $btn.classList.remove('_disabled');
            }
        } else {
            $counter.textContent = `${Math.floor(countOfSeconsd / 60)}:${(countOfSeconsd % 60 > 9) ? countOfSeconsd % 60 : '0' + countOfSeconsd % 60}`;
        }
    }, 1000)

    return interval;
}

// Remove red border and clean error message by focus

$headerSignUpCodeInput.addEventListener('focus', () => {
    $headerSignUpCodeInput.style.border = `2px solid ${COLOR_2}`;
    $headerSignUpCodeError.textContent = '';
});

// Exit visualization in header by button

$headerRightRowExit.addEventListener('click', () => {
    localStorage.setItem('isLoggedIn', 'false');

    doExit();
});

// Login visualization in header

function doLogin() {
    $headerRightRowReg.classList.add('_hidden');
    $headerRightRowLog.classList.add('_hidden');
    $headerRightRowExit.classList.add('_shown');
    $headerRightRowAccount.classList.add('_shown');
}

// Exit visualization in header

function doExit() {
    $headerRightRowReg.classList.remove('_hidden');
    $headerRightRowLog.classList.remove('_hidden');
    $headerRightRowExit.classList.remove('_shown');
    $headerRightRowAccount.classList.remove('_shown');
}

// LOG_IN

// Show sign up popup

//? $headerRightRowLog;
const $headerLogInPopup = $body.querySelector('.header__log-in-popup');
const $headerLogInCloseBtn = $headerLogInPopup.querySelector('.log-in__close');


$headerRightRowLog.addEventListener('click', () => {
    $headerLogInPopup.classList.toggle('_shown');

    if ($headerLogInPopup.classList.contains('_shown')) {
        $body.classList.add('_lock');
    } else {
        $body.classList.remove('_lock');
    }
});

window.addEventListener( 'click', (event) => {
    if ($headerLogInPopup.classList.contains('_shown')) {
        if (!event.target.closest('.log-in__container') && !event.target.closest('.right-row__log')) {
            $headerLogInPopup.classList.remove('_shown');
            $body.classList.remove('_lock');
        }
    }
});

$headerLogInCloseBtn.addEventListener('click', () => {
    if ($headerLogInPopup.classList.contains('_shown')) {
        $headerLogInPopup.classList.remove('_shown');
        $body.classList.remove('_lock');
    }
});

// Set position sign up

const $headerLogInContainer = $headerLogInPopup.querySelector('.log-in__container');

if ($headerLogInContainer.clientHeight + 40 > window.innerHeight) {
    $headerLogInPopup.style.alignItems = 'flex-start';
    $headerLogInPopup.style.marginTop = '20px';
} else {
    $headerLogInPopup.style.alignItems = 'center';
    $headerLogInPopup.style.marginTop = '0';
}

window.addEventListener('resize', () => {
    if ($headerLogInContainer.clientHeight + 40 > window.innerHeight) {
        $headerLogInPopup.style.alignItems = 'flex-start';
        $headerLogInPopup.style.marginTop = '20px';
    } else {
        $headerLogInPopup.style.alignItems = 'center';
        $headerLogInPopup.style.marginTop = '0';
    }
});

// Login form Validation

const $headerLogInForm = $headerLogInPopup.querySelector('.log-in__form');

const $headerLogInEmail = $headerLogInForm.querySelector('.log-in__email');
const $headerLogInPassword = $headerLogInForm.querySelector('.log-in__password');
const $headerLogInErrorMessage = $headerLogInForm.querySelector('.log-in__error-message');
const $headerLogInSubmit = $headerLogInForm.querySelector('.log-in__submit');

$headerLogInForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let errorMessage = '';

    if (!(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test($headerLogInEmail.value))) {
        $headerLogInEmail.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Incorrect email' : '???????????????????????? ?????????????????????? ??????????');
    }

    if (!stringLengthCheck($headerLogInPassword.value, 6)) {
        $headerLogInPassword.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Password less than 6 characters' : '???????????? ???????????? 6 ????????????????');
    }

    if (!(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/.test($headerLogInPassword.value))) {
        $headerLogInPassword.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Password must contain latin letters and numbers' : '???????????? ???????????? ?????????????????? ?????????????????? ?????????? ?? ??????????');
    }

    if (errorMessage) {
        $headerLogInErrorMessage.textContent = errorMessage;
    } else {
        if ($headerLogInErrorMessage.textContent) {
            $headerLogInErrorMessage.textContent = '';
        }

        // Query send for register

        fetch(`${HOST}/api/log_in`, {
            method: 'POST', 
            credentials: 'include',
            body: JSON.stringify({
                email: $headerLogInEmail.value,
                pass: $headerLogInPassword.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            const status = res.status;
            const data = await res.json();
            if (status !== 200) {
                try {
                    $headerLogInErrorMessage.textContent = (currentLanguage === 'en') ? data.en : data.ru;
                } catch (error) {
                    console.error('Error: ' + error);
                }
            } else {
                $headerLogInEmail.value = '';
                $headerLogInPassword.value = '';

                $headerLogInEmail.style.border = `2px solid ${COLOR_2}`;
                $headerLogInPassword.style.border = `2px solid ${COLOR_2}`;

                $headerSignUpCodeError.textContent = '';

                localStorage.setItem('isLoggedIn', 'true');
                doLogin();

                $headerLogInPopup.classList.remove('_shown');
                $body.classList.remove('_lock');
            }
        })
        .catch((error) => {
            $headerLogInErrorMessage.textContent = (currentLanguage === 'en') ? 'Unexpected error' : '???????????????????????????? ????????????';    
            console.error('Fetch error');
        });
    }
});

// Restore password

const $headerLogInBackBtn = $headerLogInPopup.querySelector('.log-in__back');

const $headerLogInRestorePassword = $headerLogInForm.querySelector('.log-in__restore-password');
const $headerLogInMainContainer = $headerLogInPopup.querySelector('.log-in__main-container');
const $headerLogInConfirmationContainer = $headerLogInPopup.querySelector('.log-in__confirmation-container');
const $headerLogInConfirmationError = $headerLogInPopup.querySelector('.log-in__confirmation-error');
const $headerLogInConfirmationForm = $headerLogInPopup.querySelector('.log-in__confirmation-form');
const $headerLogInConfirmationEmail = $headerLogInConfirmationForm.querySelector('.log-in__confirmation-email');
const $headerLogInConfirmationSubmit = $headerLogInConfirmationForm.querySelector('.log-in__confirmation-submit');
const $headerLogInConfirmationCounter = $headerLogInConfirmationForm.querySelector('.log-in__confirmation-counter');
const $headerLogInCodeForm = $headerLogInPopup.querySelector('.log-in__code-form');
const $headerLogInCode = $headerLogInCodeForm.querySelector('.log-in__code');
const $headerLogInCodeSubmit = $headerLogInCodeForm.querySelector('.log-in__code-submit');
const $headerLogInNewPassContainer = $headerLogInPopup.querySelector('.log-in__new-pass-container');

let resendMessageCounterForRefreshPassword;
let userEmailForRefreshPassword;

$headerLogInRestorePassword.addEventListener('click', () => {
    $headerLogInMainContainer.classList.add('_hidden');
    $headerLogInConfirmationContainer.classList.add('_shown');
    $headerLogInBackBtn.classList.add('_shown');
});

// Send refresh email code

$headerLogInConfirmationForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!$headerLogInConfirmationSubmit.classList.contains('_disabled')) {
        let errorMessage = '';

        if (!(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu.test($headerLogInConfirmationEmail.value))) {
            $headerLogInConfirmationEmail.style.border = '1px solid red';
            errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Incorrect email' : '???????????????????????? ?????????????????????? ??????????');
        }

        if (errorMessage) {
            $headerLogInConfirmationError.textContent = errorMessage;
        } else {
            if ($headerLogInConfirmationError.textContent) {
                $headerLogInConfirmationError.textContent = '';
            }

            // Query send for send refresh email code

            fetch(`${HOST}/api/send_refresh_email_code`, {
                method: 'POST', 
                body: JSON.stringify({
                    email: $headerLogInConfirmationEmail.value,
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(async (res) => {
                const status = res.status;
                const data = await res.json();
                if (status !== 200) {
                    try {
                        $headerLogInConfirmationError.textContent = (currentLanguage === 'en') ? data.en : data.ru;
                    } catch (error) {
                        console.error('Error: ' + error);
                    }
                } else {
                    userEmailForRefreshPassword = $headerLogInConfirmationEmail.value;

                    $headerLogInConfirmationEmail.style.border = `2px solid ${COLOR_2}`;

                    $headerLogInConfirmationError.textContent = '';

                    $headerLogInConfirmationSubmit.classList.add('_disabled');
                    resendMessageCounterForRefreshPassword = makeSendButtonInactive($headerLogInConfirmationCounter, $headerLogInConfirmationSubmit);
                    if ($headerLogInCodeSubmit.classList.contains('_disabled')) {
                        $headerLogInCodeSubmit.classList.remove('_disabled');
                    }
                }
            })
            .catch((error) => {
                $headerLogInConfirmationError.textContent = (currentLanguage === 'en') ? 'Unexpected error' : '???????????????????????????? ????????????';    
                console.error('Fetch error');
            });
        }
    }
});

// Check the access code on the server

$headerLogInCodeForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!$headerLogInCodeSubmit.classList.contains('_disabled')) {
        if (!(/^[0-9]{6}$/.test($headerLogInCode.value))) {
            $headerLogInCode.style.border = `1px solid red`;
    
            $headerLogInConfirmationError.textContent = (currentLanguage === 'en') ? 'Incorrect code' : '???????????????? ??????';
        } else {
            fetch(`${HOST}/api/check_access_code_on_server`, {
                method: 'POST', 
                credentials: 'include',
                body: JSON.stringify({
                    email: userEmailForRefreshPassword,
                    code: $headerLogInCode.value
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(async (res) => {
                const status = res.status;
                const data = await res.json();
    
                if (status !== 200) {
                    try {
                        $headerLogInConfirmationError.textContent = (currentLanguage === 'en') ? data.en : data.ru;
                    } catch (error) {
                        console.error('Error: ' + error);
                    }
                } else {
                    $headerLogInConfirmationEmail.value = '';
                    $headerLogInCode.value = '';
                    $headerLogInConfirmationEmail.style.border = `2px solid ${COLOR_2}`;
                    $headerLogInCode.style.border = `2px solid ${COLOR_2}`;
                    $headerLogInConfirmationError.textContent = '';
    
                    $headerLogInConfirmationContainer.classList.remove('_shown');
                    $headerLogInNewPassContainer.classList.add('_shown');
                    // $headerSignUpBackBtn.classList.remove('_shown');
    
                    clearInterval(resendMessageCounterForRefreshPassword);
                    $headerLogInConfirmationCounter.textContent = '';
                    if ($headerLogInConfirmationSubmit.classList.contains('_disabled')) {
                        $headerLogInConfirmationSubmit.classList.remove('_disabled');
                    }
                    $headerLogInCodeSubmit.classList.add('_disabled');
                }
            })
            .catch((error) => {
                $headerLogInConfirmationError.textContent = (currentLanguage === 'en') ? 'Unexpected error' : '???????????????????????????? ????????????';    
                console.error('Fetch error');
            });
        }
    }
});

// Send new password

const $headerLogInNewPassForm = $headerLogInNewPassContainer.querySelector('.log-in__new-pass-form');
const $headerLogInNewPass = $headerLogInNewPassContainer.querySelector('.log-in__new-pass');
const $headerLogInRepeatNewPass = $headerLogInNewPassContainer.querySelector('.log-in__repeat-new-pass');
const $headerLogInNewPassError = $headerLogInNewPassContainer.querySelector('.log-in__new-pass-error');

$headerLogInNewPassForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let errorMessage = '';

    if (!(/^(?=.*\d)(?=.*[a-zA-Z])(?!.*\s).*$/.test($headerLogInNewPass.value))) {
        $headerLogInNewPass.style.border = '1px solid red';
        $headerLogInRepeatNewPass.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Password must contain latin letters and numbers' : '???????????? ???????????? ?????????????????? ?????????????????? ?????????? ?? ??????????');
    }

    if (!stringLengthCheck($headerLogInNewPass.value, 6)) {
        $headerLogInNewPass.style.border = '1px solid red';
        $headerLogInRepeatNewPass.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Password less than 6 characters' : '???????????? ???????????? 6 ????????????????');
    }

    if ($headerLogInNewPass.value !== $headerLogInRepeatNewPass.value) {
        $headerLogInNewPass.style.border = '1px solid red';
        $headerLogInRepeatNewPass.style.border = '1px solid red';
        errorMessage = (errorMessage) ? errorMessage : ((currentLanguage === 'en') ? 'Passwords do not match' : '???????????? ???? ??????????????????');
    }

    if (errorMessage) {
        $headerLogInNewPassError.textContent = errorMessage;
    } else {
        if ($headerLogInNewPassError.textContent) {
            $headerLogInNewPassError.textContent = '';
        }

        // Query send

        fetch(`${HOST}/api/change_user_password`, {
            method: 'POST', 
            credentials: 'include',
            body: JSON.stringify({
                pass: $headerLogInNewPass.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(async (res) => {
            const status = res.status;
            const data = await res.json();
            if (status !== 200) {
                try {
                    $headerLogInNewPassError.textContent = (currentLanguage === 'en') ? data.en : data.ru;
                } catch (error) {
                    console.error('Error: ' + error);
                }
            } else {
                $headerLogInNewPass.value = '';
                $headerLogInRepeatNewPass.value = '';

                $headerLogInNewPass.style.border = `2px solid ${COLOR_2}`;
                $headerLogInRepeatNewPass.style.border = `2px solid ${COLOR_2}`;

                $headerLogInNewPassError.textContent = '';

                localStorage.setItem('isLoggedIn', 'true');
                doLogin();

                $headerLogInPopup.classList.remove('_shown');
                $headerLogInConfirmationContainer.classList.remove('_shown');
                $headerLogInNewPassContainer.classList.remove('_shown');
                $headerLogInMainContainer.classList.remove('_hidden');
                $body.classList.remove('_lock');
            }
        })
        .catch((error) => {
            $headerLogInNewPassError.textContent = (currentLanguage === 'en') ? 'Unexpected error' : '???????????????????????????? ????????????';    
            console.error('Fetch error');
        });
    }
});

// Remove red border by focus registration input

removeRedBorder($headerLogInEmail);
removeRedBorder($headerLogInPassword);
removeRedBorder($headerLogInConfirmationEmail);
removeRedBorder($headerLogInCode);
removeRedBorder($headerLogInNewPass);
removeRedBorder($headerLogInRepeatNewPass);

// Back to login

$headerLogInBackBtn.addEventListener('click', () => {
    if ($headerLogInConfirmationContainer.classList.contains('_shown')) {
        $headerLogInConfirmationContainer.classList.remove('_shown');
    }
    if ($headerLogInNewPassContainer.classList.contains('_shown')) {
        $headerLogInNewPassContainer.classList.remove('_shown');
    }

    $headerLogInMainContainer.classList.remove('_hidden');
    $headerLogInBackBtn.classList.remove('_shown');
});

// PRODUCT_PAGE

// Set min width for product page description

const $productPage = $body.querySelector('.produst-page');
const $productPageDescription = $body.querySelector('.produst-page__description');

$productPageDescription.style.minHeight = `${window.innerHeight - parseInt(window.getComputedStyle($body.querySelector('header')).height) - parseInt(window.getComputedStyle($productPage).paddingTop)}px`

// PRODUCT SETTINGS

// Set width for product settings container

const $productSettings = $body.querySelector('.product-settings');
const $productSettingsContainer = $productSettings.querySelector('.product-settings__container');
const productSettingsVerticalPadding = 10;

if (document.documentElement.clientWidth > 800) {
    $productSettingsContainer.style.height = `${document.documentElement.clientHeight - parseInt(window.getComputedStyle($body.querySelector('header')).height) - parseInt(window.getComputedStyle($productPage).paddingTop) - productSettingsVerticalPadding*2}px`;
}

// Set position for product settings container

let baseTopForDescription = parseInt(window.getComputedStyle($body.querySelector('header')).height) + parseInt(window.getComputedStyle($productPage).paddingTop);
let baseTopForProductSettingsContainer = baseTopForDescription + productSettingsVerticalPadding;
const $produstPageDescription = $productPage.querySelector('.produst-page__description');

if (window.clientWidth > 800) {
    if (window.scrollY >= (baseTopForDescription + $produstPageDescription.clientHeight - window.innerHeight)) {
        setPositionToEnd();
    } else {
        setPositionToStart();
    }
}

window.addEventListener('scroll', () => {
    if (window.innerWidth > 800) {
        if (window.scrollY >= (baseTopForDescription + $produstPageDescription.clientHeight - window.innerHeight)) {
            setPositionToEnd();
        } else {
            setPositionToStart();
        }
    }
});

function setPositionToStart() {
    $productSettingsContainer.style.top = `${baseTopForProductSettingsContainer}px`;
    parseFloat(window.getComputedStyle($productPageDescription).border.split(' ')[0])
    $productSettingsContainer.style.left = `${$productPageDescription.getBoundingClientRect().left + $productPageDescription.clientWidth + parseFloat(window.getComputedStyle($productPageDescription).border.split(' ')[0])*2 }px`;
    $productSettingsContainer.style.position = 'fixed';
}

function setPositionToEnd() {
    $productSettingsContainer.style.position = 'relative';
    $productSettingsContainer.style.left = `0px`;
    $productSettingsContainer.style.top = `${baseTopForDescription + $produstPageDescription.clientHeight - $productSettingsContainer.clientHeight - productSettingsVerticalPadding - baseTopForProductSettingsContainer}px`;
}

// Run radiobuttons

$body.querySelectorAll('.product-settings__radiobutton').forEach($item => {
    $item.addEventListener('click', runRadiobutton);
});

function runRadiobutton(event) {
    const $target = event.target.closest('.product-settings__radiobutton');
    const $parent = $target.parentNode;

    $parent.querySelectorAll('.product-settings__radiobutton').forEach($item => {
        if ($item.classList.contains('_checked')) {
            $item.classList.remove('_checked');
            $item.setAttribute('data-status', 'off');
        }
    });

    $target.classList.add('_checked');
    $target.setAttribute('data-status', 'on');
}

// Run slider range

const $optionsRange = $body.querySelectorAll('.product-settings__option.range');
const priceGaps = [1];

for (let i = 0; i < $optionsRange.length; i++) {
    const $progress = $optionsRange[i].querySelector('.product-settings__range-progress');
    const $inputsForRange = $optionsRange[i].querySelectorAll('.product-settings__input-for-range');
    const $ranges = $optionsRange[i].querySelectorAll('.product-settings__range');

    // Run input for slider range

    $inputsForRange.forEach($inputForRange => {
        $inputForRange.addEventListener('input', event => {
            const min = $ranges[0].getAttribute('min');
            const max = $ranges[0].getAttribute('max');
            let minVal = ($inputsForRange[0].value && $inputsForRange[0].value >= 0) ? parseInt($inputsForRange[0].value) : 0;
            let maxVal = ($inputsForRange[1].value && $inputsForRange[0].value >= 0) ? parseInt($inputsForRange[1].value) : 0;

            if ((maxVal - minVal >= priceGaps[i]) && (maxVal <= max)) {
                if (event.target.classList.contains('product-settings__input-for-range-min')) {
                    $ranges[0].value = minVal;
                    $progress.style.left = `${(minVal / max) * 100}%`;
                } else {
                    $ranges[1].value = maxVal;
                    $progress.style.right = `${100 - (maxVal / max) * 100}%`;
                }
            }
        });
    });

    // Run slider range

    $ranges.forEach($inputForRange => {
        $inputForRange.addEventListener('input', event => {
            const min = $ranges[0].getAttribute('min');
            const max = $ranges[0].getAttribute('max');
            let minVal = parseInt($ranges[0].value);
            let maxVal = parseInt($ranges[1].value);

            if (maxVal - minVal < priceGaps[i]) {
                if (event.target.classList.contains('product-settings__range-min')) {
                    $ranges[0].value = maxVal - priceGaps[i];
                } else {
                    $ranges[1].value = minVal + priceGaps[i];
                }
            } else {
                $inputsForRange[0].value = minVal;
                $inputsForRange[1].value = maxVal;
                $progress.style.left = `${(minVal / max) * 100}%`;
                $progress.style.right = `${100 - (maxVal / max) * 100}%`;
            }
        });
    });
}

// Adoptive

let windowWidth = document.documentElement.clientWidth;
let windowHeight = window.innerHeight;
// Values: 'null', 'less', 'more'
let adobtiveStatus = 'null'

window.addEventListener('resize', () => {

    // Width adoptive

    baseTopForDescription = parseInt(window.getComputedStyle($body.querySelector('header')).height) + parseInt(window.getComputedStyle($productPage).paddingTop);
    baseTopForProductSettingsContainer = baseTopForDescription + productSettingsVerticalPadding;

    if (document.documentElement.clientWidth > 800) {
        $productSettingsContainer.style.left = `${$productPageDescription.getBoundingClientRect().left + $productPageDescription.clientWidth + 4}px`;
        //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        console.log(window.innerHeight)
        $productSettingsContainer.style.height = `${document.documentElement.clientHeight - parseInt(window.getComputedStyle($body.querySelector('header')).height) - parseInt(window.getComputedStyle($productPage).paddingTop) - productSettingsVerticalPadding*2}px`;

        if (window.scrollY >= (baseTopForDescription + $produstPageDescription.clientHeight - window.innerHeight)) {
            setPositionToEnd();
        } else {
            setPositionToStart();
        }

        if (adobtiveStatus !== 'more') {
            adobtiveStatus = 'more';
        }
    } else if (adobtiveStatus !== 'less') {
        $productSettingsContainer.style.height = 'auto';
        $productSettingsContainer.style.position = 'relative';
        $productSettingsContainer.style.left = `0px`;
        $productSettingsContainer.style.top = `0px`;
        adobtiveStatus = 'less';
    }
});

// Price formation

const dataForPriceFormation = {
    base_price: 8.5,
    radio: {
        region: {
            eu: {
                is_coef: true,
                value: 1
            },
            us: {
                is_coef: true,
                value: 1.2
            }
        },
        faction: {
            horde: {
                is_coef: true,
                value: 1
            },
            alliance: {
                is_coef: true,
                value: 1
            }
        },
        boost_method: {
            self_play: {
                is_coef: true,
                value: 1
            },
            piloted: {
                is_coef: true,
                value: 1.06
            },
            remote_control: {
                is_coef: true,
                value: 1
            }
        },
        execution_options: {
            normal: {
                is_coef: true,
                value: 1
            },
            extra_fast: {
                is_coef: false,
                value: 8.28
            },
            faster_25: {
                is_coef: false,
                value: 3.31
            },
            faster_50: {
                is_coef: false,
                value: 5.8
            }
        }
    },
    range: {
        levels: {
            is_coef: false,
            value: 0.74
        }
    },
    checkbox: {
        additional_options: {
            additional_options_1: {
                is_coef: false,
                value: 18.15
            },
            additional_options_2: {
                is_coef: false,
                value: 40.59
            },
            additional_options_3: {
                is_coef: false,
                value: 45.93
            },
            additional_options_4: {
                is_coef: false,
                value: 32.04
            }
        }
    },
    select: {
        multiple_character_leveling: {
            characters_1: {
                is_coef: false,
                value: 0
            },
            characters_2: {
                is_coef: false,
                value: 15.12
            },
            characters_3: {
                is_coef: false,
                value: 29.43
            },
            characters_4: {
                is_coef: false,
                value: 43.24
            },
            characters_5: {
                is_coef: false,
                value: 56.71
            },
            characters_6: {
                is_coef: false,
                value: 68.71
            }
        }
    }
}

const $productPricesEn = $body.querySelectorAll('.product-price__price .en .product-price__text');
const $productPricesRu = $body.querySelectorAll('.product-price__price .ru .product-price__text');
const $radios = $body.querySelectorAll('.product-settings__option.radio');
const $ranges = $body.querySelectorAll('.product-settings__option.range');
const $checkboxes = $body.querySelectorAll('.product-settings__option.checkbox');
const $selects = $body.querySelectorAll('.product-settings__option.select');
let price = dataForPriceFormation.base_price;
let coef = 1;

priceFormation();

$radios.forEach($radio => {
    $radio.querySelectorAll('.product-settings__radiobutton').forEach($radioItem => {
        $radioItem.addEventListener('click', () => {
            priceFormation();
        });
    });
});

$ranges.forEach($range => {
    $range.querySelectorAll('input').forEach($rangeItem => {
        $rangeItem.addEventListener('input', () => {
            priceFormation();
        });
    });
});

$checkboxes.forEach($checkbox => {
    $checkbox.querySelectorAll('.product-settings__checkbox').forEach($checkboxItem => {
        $checkboxItem.addEventListener('input', () => {
            priceFormation();
        });
    });
});

$selects.forEach($select => {
    $select.querySelector('.product-settings__select').addEventListener('input', () => {
        priceFormation();
    });
});

function priceFormation() {
    price = dataForPriceFormation.base_price;
    coef = 1;

    $radios.forEach($radio => {
        $checked = $radio.querySelector('._checked');
        const data = dataForPriceFormation.radio[$checked.getAttribute('name')][$checked.getAttribute('value')];

        if (data.is_coef) {
            coef *= data.value;
        } else {
            price += data.value;
        }
    });


    $ranges.forEach($range => {
        const delta = ($range.querySelector('.product-settings__input-for-range-max').value - $range.querySelector('.product-settings__input-for-range-min').value);
        const maxDelta = $range.querySelector('.product-settings__range-min').getAttribute('max') - $range.querySelector('.product-settings__range-min').getAttribute('min');

        if (dataForPriceFormation.range[$range.querySelector('.product-settings__input-for-range-min').getAttribute('name')].is_coef) {
            if (delta >= 1 && delta <= maxDelta) {
                coef *= delta * dataForPriceFormation.range[$range.querySelector('.product-settings__input-for-range-min').getAttribute('name')].value;
            }
        } else {
            if (delta >= 1 && delta <= maxDelta) {
                price += delta * dataForPriceFormation.range[$range.querySelector('.product-settings__input-for-range-min').getAttribute('name')].value;
            }
        }
    });

    $checkboxes.forEach($checkbox => {
        $checkbox.querySelectorAll('.product-settings__checkbox').forEach($checkboxItem => {
            if ($checkboxItem.checked) {
                if (dataForPriceFormation.checkbox[$checkboxItem.getAttribute('data-checkbox-name')][$checkboxItem.getAttribute('name')].is_coef) {
                    coef *= dataForPriceFormation.checkbox[$checkboxItem.getAttribute('data-checkbox-name')][$checkboxItem.getAttribute('name')].value;
                } else {
                    price += dataForPriceFormation.checkbox[$checkboxItem.getAttribute('data-checkbox-name')][$checkboxItem.getAttribute('name')].value;
                }
            }
        });
    });

    $selects.forEach($select => {
        const $selectItem = $select.querySelector('.product-settings__select');

        if (dataForPriceFormation.select[$selectItem.getAttribute('name')][$selectItem.value]) {
            if (dataForPriceFormation.select[$selectItem.getAttribute('name')][$selectItem.value].is_coef) {
                coef *= dataForPriceFormation.select[$selectItem.getAttribute('name')][$selectItem.value].value;
            } else {
                price += dataForPriceFormation.select[$selectItem.getAttribute('name')][$selectItem.value].value;
            }
        }
    });

    price *= coef;
    $productPricesEn[0].textContent = price.toFixed(2);
    $productPricesEn[1].textContent = price.toFixed(2);
    $productPricesRu[0].textContent = (price * 76).toFixed(2);
    $productPricesRu[1].textContent = (price * 76).toFixed(2);
}

// PRODUCTS



// // Adding slider functionality

// const priceForOneLevelInRub = 70;
// const priceForOneLevelInUsd = 1;

// for (let i = 0; i < $body.querySelectorAll('.product .product-card').length; i++) {
//     const $productCards = $body.querySelectorAll(`#product_card_form_${String(i + 1)}`);

//     $productCards.forEach($item => {
//         addingSliderFunctionality($item);
//     });
// }

// function addingSliderFunctionality($form) {
//     const $input = $form.querySelector('.product-card__levels-input');
//     const $output = $form.querySelector('.product-card__levels-output');
//     const $value = $form.querySelector('.product-card__price-value');

//     $value.textContent = (currentLanguage === 'en') ? $input.value * priceForOneLevelInUsd : $input.value * priceForOneLevelInRub;

//     $headerLanguage.addEventListener('click', () => {
//         $value.textContent = (currentLanguage === 'en') ? $input.value * priceForOneLevelInUsd : $input.value * priceForOneLevelInRub;
//     });

//     $input.addEventListener('input', () => {
//         $output.textContent = $input.value;
//         $value.textContent = (currentLanguage === 'en') ? $input.value * priceForOneLevelInUsd : $input.value * priceForOneLevelInRub;
//     });
// }

// REVIEW 

//Review slider

const $content = $body.querySelector('.content');
const $reviewContentContainer = $body.querySelector('.reviews__content-container');
let $reviewsArray = $reviewContentContainer.querySelectorAll('.review');

const countReview = $reviewsArray.length;
let contentWidth = $content.clientWidth - 30;
let reviewWidth = $reviewsArray[0].clientWidth;
let countReviewInContainer = ((contentWidth % reviewWidth) / (Math.floor(contentWidth / reviewWidth) - 1) >= 10) ? Math.floor(contentWidth / reviewWidth) : Math.floor(contentWidth / reviewWidth) - 1;
let reviewGap = ((contentWidth - (reviewWidth * countReviewInContainer)) / (countReviewInContainer - 1) < 25) ? (contentWidth - (reviewWidth * countReviewInContainer)) / (countReviewInContainer - 1) : 25;
let sidePadding = (contentWidth - (countReviewInContainer * reviewWidth + reviewGap * (countReviewInContainer - 1))) / 2;

$reviewContentContainer.style.width = `${(contentWidth - sidePadding * 2 > contentWidth) ? contentWidth : contentWidth - sidePadding * 2}px`;
$reviewContentContainer.style.height = `${$reviewsArray[0].clientHeight}px`;
$reviewsArray[0].style.left = `-${reviewWidth + reviewGap}px`
$reviewsArray[1].style.left = `${0}px`
for (let i = 0; i < countReviewInContainer - 1; i++) {
    $reviewsArray[i + 2].style.left = `${(reviewWidth + reviewGap) * (i + 1)}px`
}
for (let i = 0; i < countReview - countReviewInContainer - 1; i++) {
    $reviewsArray[countReviewInContainer + i + 1].style.left = `${(reviewWidth + reviewGap) * countReviewInContainer}px`
}

window.addEventListener('resize', () => {
    setTimeout(() => {
        contentWidth = $content.clientWidth - 30;
        reviewWidth = $reviewsArray[0].clientWidth;
        countReviewInContainer = ((contentWidth % reviewWidth) / (Math.floor(contentWidth / reviewWidth) - 1) >= 10) ? Math.floor(contentWidth / reviewWidth) : Math.floor(contentWidth / reviewWidth) - 1;
        reviewGap = ((contentWidth - (reviewWidth * countReviewInContainer)) / (countReviewInContainer - 1) < 25) ? (contentWidth - (reviewWidth * countReviewInContainer)) / (countReviewInContainer - 1) : 25;
        sidePadding = (contentWidth - (countReviewInContainer * reviewWidth + reviewGap * (countReviewInContainer - 1))) / 2;

        $reviewContentContainer.style.width = `${(contentWidth - sidePadding * 2 > contentWidth) ? contentWidth : contentWidth - sidePadding * 2}px`;
        $reviewContentContainer.style.height = `${$reviewsArray[0].clientHeight}px`;
        $reviewsArray[0].style.left = `-${reviewWidth + reviewGap}px`
        $reviewsArray[1].style.left = `${0}px`
        for (let i = 0; i < countReviewInContainer - 1; i++) {
            $reviewsArray[i + 2].style.left = `${(reviewWidth + reviewGap) * (i + 1)}px`
        } 
        for (let i = 0; i < countReview - countReviewInContainer - 1; i++) {
            $reviewsArray[countReviewInContainer + i + 1].style.left = `${(reviewWidth + reviewGap) * countReviewInContainer}px`
        }
    }, 500);
})

setInterval(slide, 5000);

function slide() {
    for (let i = 0; i < countReviewInContainer + 1; i++) {
        $reviewsArray[i + 1].style.left = `${parseInt($reviewsArray[i + 1].style.left) - (reviewWidth + reviewGap)}px`;
    }
    
    $reviewsArray[0].style.left = `${(reviewWidth + reviewGap) * countReviewInContainer}px`
    $reviewContentContainer.append($reviewsArray[0]);
    $reviewsArray = $reviewContentContainer.querySelectorAll('.review');
}

// FOOTER

// Activate navigation scroll buttons

const $footerNavServices = $body.querySelector('.footer__nav-services');
const $footerNavPersonalService = $body.querySelector('.footer__nav-personal-service');
const $footerNavAdvantages = $body.querySelector('.footer__nav-advantages');
const $footerNavReviews = $body.querySelector('.footer__nav-reviews');

//? $products;
const $personalService = $body.querySelector('.other-product');
const $advantages = $body.querySelector('.advantages');
const $reviews = $body.querySelector('.reviews');

//! activeteScrollButton($footerNavServices, $products);
activeteScrollButton($footerNavPersonalService, $personalService, 20);
activeteScrollButton($footerNavAdvantages, $advantages, 20);
activeteScrollButton($footerNavReviews, $reviews);

function activeteScrollButton($btn, $element, numberOfPixelsToMoveUp = 0) {
    $btn.addEventListener('click', () => {
        window.scrollBy(0, ($element.getBoundingClientRect().y - numberOfPixelsToMoveUp));
    });
}

