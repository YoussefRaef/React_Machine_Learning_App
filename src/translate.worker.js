import {pipeline} from '@xenova/transformers'
import Translation from './components/Translation'

class MyTranslationPipeline{
    static task = 'translation'
    static model = 'Xenova/nllb-200-distilled600M'
    static instance = null

    static async getInstance(progress_callback = null) {
        if (this.instance === null) {
            this.instance = await pipeline(this.task, null, { progress_callback })
        }

        return this.instance
    }
}

self.addEventListener('message',async (event)=>{
    let transnlator = await MyTranslationPipeline.getInstance(x=>{
        self.postMessage(x)
    })

    let output = await transnlator(event.data.text,{
        tgt_lang: event.data.trgt_lang,
        src_lang:event.data.src_lang,
        callback_function:x=>{
            self.postMessage({
                status:'update',
                output:transnlator.tokenizer.decode(x[0].output_token_ids,{
                    skip_special_tokens:true
                })

            })
        }
    })
    self.postMessage({
        status:'complete',
        output
    })
})