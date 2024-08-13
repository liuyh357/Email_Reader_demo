import dashscope
from http import HTTPStatus

def translate_to_chinese(content):

    api_key = "sk-c30672bc9ae049cd88fa9f81e3405cff"
    dashscope.api_key = api_key
    prompt = "你是一个受众调研专家，下面我讲输入一段文本邮件，请你根据文本内容，分析谁最可能是该段文本邮件的受众。你需要返回五个最可能的受众。"
    prompt+="你的返回格式是:[{"occupation":xx,"age":xx,"gender":xx,"relationship":xx},......]"
    prompt+="你只需要返回这样的列表中嵌套字典的格式就可以，不需要多余的文字。下面是文本邮件内容："
    prompt+=content
    
    response = dashscope.Generation.call(
        model=dashscope.Generation.Models.qwen_max,
        prompt=prompt
    )

    if response.status_code == HTTPStatus.OK:
        translation = response.output.text
        # 假设翻译结果是 "你好，你好吗？"
        # 解析成列表
        translation_list = translation.split(', ')
        return translation_list
    else:
        print(f"Error Code: {response.code}")
        print(f"Error Message: {response.message}")
        return None

if __name__ == '__main__':
    content = "这是一段文本邮件内容"
    result = translate_to_chinese(content)
    print(result)
