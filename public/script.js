

// document.addEventListener('DOMContentLoaded', () => {
//     const userInput = document.getElementById('userInput');
//     const submitButton = document.getElementById('submitButton');
//     const avatars = document.querySelectorAll('.avatar');
//     const outputText = document.getElementById('outputText');
//     const applyButton = document.getElementById('applyButton');
//     const infoInputs = document.querySelectorAll('.info');
//     const resultDiv = document.getElementById('result');
//     let selectedAvatarId = null;
//     let analysisResults = [];

//     submitButton.addEventListener('click', () => {
//         const inputText = userInput.value;

//         fetch('/analyze', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/x-www-form-urlencoded'
//             },
//             body: `user_input=${encodeURIComponent(inputText)}`
//         })
//         .then(response => response.json())
//         .then(data => {
//             console.log('Analysis Results:', data);
//             analysisResults = data;
//             resultDiv.textContent = '分析完成，请点击头像查看结果。';
//         })
//         .catch(error => {
//             console.error('Error analyzing text:', error);
//             resultDiv.textContent = '分析失败，请重试。';
//         });
//     });

//     avatars.forEach(avatar => {
//         avatar.addEventListener('click', () => {
//             avatars.forEach(av => av.classList.remove('selected'));
//             avatar.classList.add('selected');
//             selectedAvatarId = avatar.getAttribute('data-id');
//             applyButton.style.display = 'block';

//             if (analysisResults.length > 0) {
//                 const selectedResult = analysisResults[selectedAvatarId - 1];
//                 infoInputs.forEach(input => {
//                     const field = input.getAttribute('data-field');
//                     input.value = selectedResult[field] !== undefined ? selectedResult[field] : '';
//                 });
//             }
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
    const resultDiv = document.getElementById('result');
    let selectedAvatarId = null;
    let analysisResults = [];

    submitButton.addEventListener('click', () => {
        const inputText = userInput.value;
        resultDiv.textContent = '后端正在努力分析中';

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
            resultDiv.textContent = '分析完成，请点击头像查看结果。';
        })
        .catch(error => {
            console.error('Error analyzing text:', error);
            resultDiv.textContent = '分析失败，请重试。';
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
                    input.value = selectedResult[field] !== undefined ? selectedResult[field] : '';
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
