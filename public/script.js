



document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('userInput');
    const submitButton = document.getElementById('submitButton');
    const avatars = document.querySelectorAll('.avatar');
    const outputText = document.getElementById('outputText');
    const applyButton = document.getElementById('applyButton');
    const infoInputs = document.querySelectorAll('.info');
    const resultDiv = document.getElementById('result');
    const applyResultDiv = document.getElementById('applyResult');
    const replyText = document.getElementById('replyText');
    const replyButton = document.getElementById('replyButton');
    const replyResultDiv = document.getElementById('replyResult');
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
            applyButton.style.display = 'inline-block';
            replyButton.style.display = 'inline-block';

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
            const inputText = userInput.value;
            const occupation = document.querySelector(`input[data-field="occupation"]`).value;
            const age = document.querySelector(`input[data-field="age"]`).value;
            const gender = document.querySelector(`input[data-field="gender"]`).value;
            const relationship = document.querySelector(`input[data-field="relationship"]`).value;

            applyResultDiv.textContent = '后端正在努力生成反馈中';

            fetch('/generate-feedback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `user_input=${encodeURIComponent(inputText)}&occupation=${encodeURIComponent(occupation)}&age=${encodeURIComponent(age)}&gender=${encodeURIComponent(gender)}&relationship=${encodeURIComponent(relationship)}`
            })
            .then(response => response.json())
            .then(data => {
                outputText.value = data.feedback;
                applyResultDiv.textContent = '反馈生成完成';
            })
            .catch(error => {
                console.error('Error generating feedback:', error);
                outputText.value = '生成反馈失败，请重试。';
                applyResultDiv.textContent = '反馈生成失败，请重试。';
            });
        }
    });

    replyButton.addEventListener('click', () => {
        if (selectedAvatarId) {
            const inputText = userInput.value;
            const occupation = document.querySelector(`input[data-field="occupation"]`).value;
            const age = document.querySelector(`input[data-field="age"]`).value;
            const gender = document.querySelector(`input[data-field="gender"]`).value;
            const relationship = document.querySelector(`input[data-field="relationship"]`).value;

            replyResultDiv.textContent = '后端正在努力生成回信中';

            fetch('/generate-reply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: `user_input=${encodeURIComponent(inputText)}&occupation=${encodeURIComponent(occupation)}&age=${encodeURIComponent(age)}&gender=${encodeURIComponent(gender)}&relationship=${encodeURIComponent(relationship)}`
            })
            .then(response => response.json())
            .then(data => {
                replyText.value = data.reply;
                replyResultDiv.textContent = '回信生成完成';
            })
            .catch(error => {
                console.error('Error generating reply:', error);
                replyText.value = '生成回信失败，请重试。';
                replyResultDiv.textContent = '回信生成失败，请重试。';
            });
        }
    });
});
