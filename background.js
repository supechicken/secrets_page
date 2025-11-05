const BACKEND_URL = 'https://mkpsecret-api.supechicken666.eu.org',
      UPLOAD_PATH = '/9e41f1d6-d055-47c7-b552-a5f88ed5593f/newResponse',
      HINT_TEXTS  = ['今日七樓天台好大陣大麻味，有無同學聞到？？', '今日又俾人抓頭髮，好煩！！！！！', '唧唧復唧唧，木蘭當戶織。', '請文明發言']

async function startHintLoop() {
  const textbox = document.querySelector('#input-box > textarea');

  for (const hint of HINT_TEXTS) {
    textbox.placeholder = '';

    for (const c of hint) {
      textbox.placeholder = textbox.placeholder + c;
      await new Promise((resolve, _) => setTimeout(() => resolve(), 100));
    };

    await new Promise((resolve, _) => setTimeout(() => resolve(), 2500));
  }

  startHintLoop();
}

function isValidJSON(content) {
  try {
    return JSON.parse(content);
  } catch (e) {
    console.warn(`Malformed JSON string: ${e.message}\n\n`, content);
    return false;
  }
}

function showMessage(message) {
  console.warn(message);
  alert(message);
}

async function submitResponse() {
  const textbox = document.querySelector('#input-box > textarea');

  if (textbox.value.trim() === '') {
    showMessage('師兄／師姐，唔好交白卷。。。');
    return false;
  }

  try {
    const apiResponse  = await fetch(BACKEND_URL + UPLOAD_PATH, { method: 'POST', body: JSON.stringify({ response: textbox.value }) }),
          responseJSON = isValidJSON(await apiResponse.text());

    if (!responseJSON && apiResponse.status != 201) {
      showMessage(`投稿失敗 (HTTP 回報狀態碼 ${apiResponse.status})`);
      return false;
    }

    switch (responseJSON.message) {
      case 'Success':
        showMessage('投稿成功！');
        return true;
      case 'Too many responses':
        showMessage('師兄／師姐：\n\n一分鐘內最多只可以投五次稿，請稍後再試！');
        return false;
      case 'API Failed':
        showMessage(`投稿失敗，以下為 GitHub REST API 返回的錯誤：\n\n${responseJSON.gh_api_response}`);
        return false;
      default:
        showMessage(`投稿失敗，原因如下：\n\n${responseJSON.message}`);
        return false;
    }
  } catch (e) {
    showMessage(`投稿失敗，原因如下：\n\n${e}`);
  }
}

(async () => {
  const submitBtn = document.getElementById('submit-btn');

  startHintLoop();

  submitBtn.onclick = () => submitResponse();
})();