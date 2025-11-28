import ollama from 'ollama'

async function main() {
    const imagePath = './public/image.png'
    const response = await ollama.generate({
        model: 'qwen3-vl:2b',
        prompt: 'describe this image:',
        images: [imagePath],
        stream: true,
    })
    for await (const part of response) {
        process.stdout.write(part.response)
    }
}

main().catch(console.error)