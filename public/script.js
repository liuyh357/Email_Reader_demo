



// document.addEventListener('DOMContentLoaded', () => {
//     const avatars = document.querySelectorAll('.avatar');
//     const outputText = document.getElementById('outputText');
//     const applyButton = document.getElementById('applyButton');
//     const infoInputs = document.querySelectorAll('.info');
//     let selectedAvatarId = null;

//     avatars.forEach(avatar => {
//         avatar.addEventListener('click', () => {
//             // 移除所有头像的选中样式
//             avatars.forEach(av => av.classList.remove('selected'));
//             // 添加选中样式到当前点击的头像
//             avatar.classList.add('selected');
//             selectedAvatarId = avatar.getAttribute('data-id');
//             // 显示Apply按钮
//             applyButton.style.display = 'block';

//             // 获取当前头像的信息输入框
//             infoInputs.forEach(input => {
//                 const field = input.getAttribute('data-field');
//                 fetch(`/api/get-info?avatarId=${selectedAvatarId}&field=${field}`)
//                     .then(response => response.json())
//                     .then(data => {
//                         input.value = data.value;
//                     })
//                     .catch(error => {
//                         console.error('Error fetching info:', error);
//                     });
//             });
//         });
//     });

//     applyButton.addEventListener('click', () => {
//         if (selectedAvatarId) {
//             fetch(`/api/get-text?avatarId=${selectedAvatarId}`)
//                 .then(response => response.json())
//                 .then(data => {
//                     outputText.value = data.text;
//                 })
//                 .catch(error => {
//                     console.error('Error fetching text:', error);
//                 });
//         }
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const submitButton = document.getElementById('submitButton');
    const avatars = document.querySelectorAll('.avatar');
    const outputText = document.getElementById('outputText');
    const applyButton = document.getElementById('applyButton');
    const infoInputs = document.querySelectorAll('.info');
    let selectedAvatarId = null;
    let analysisResults = [];

    submitButton.addEventListener('click', () => {
        const inputText = userInput.value;

        fetch('/analyze', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `user_input=${encodeURIComponent(inputText)}`
        })
        .then(response => response.json())
        .then(data => {
            console.log('Analysis Results:', data);
            analysisResults = data;
        })
        .catch(error => {
            console.error('Error analyzing text:', error);
        });
    });

    avatars.forEach(avatar => {
        avatar.addEventListener('click', () => {
            avatars.forEach(av => av.classList.remove('selected'));
            avatar.classList.add('selected');
            selectedAvatarId = avatar.getAttribute('data-id');
            applyButton.style.display = 'block';

            if (analysisResults.length > 0) {
                const selectedResult = analysisResults[selectedAvatarId - 1];
                infoInputs.forEach(input => {
                    const field = input.getAttribute('data-field');
                    input.value = selectedResult[field] || '';
                });
            }
        });
    });

    applyButton.addEventListener('click', () => {
        if (selectedAvatarId) {
            fetch(`/api/get-text?avatarId=${selectedAvatarId}`)
                .then(response => response.json())
                .then(data => {
                    outputText.value = data.text;
                })
                .catch(error => {
                    console.error('Error fetching text:', error);
                });
        }
    });
});
