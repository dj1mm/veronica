
import * as vscode from 'vscode';

let inputRadix: number = 2;
let outputRadix: number = 10;

function radixToString(radix: number) : string
{
    switch (radix) {
        case 2:
            return 'binary';
        case 10:
            return 'decimal';
        case 16:
            return 'hexadecimal';
        default:
            return 'unknown';
    }
}

function convert(input: string, from: number, to: number)
{
    if (from == to)
        return input;

    let temporary = "";

    let prompt: number[] = [];
    [...input].reverse().forEach(v => prompt.push(parseInt(v, from)));
    while(prompt.length != 1 || prompt[0] != 0)
    {
        let remainder = 0;
        for (let i = prompt.length-1; i >= 0; i--)
        {
            remainder = from * remainder + prompt[i];
            prompt[i] = Math.floor(remainder / to);
            remainder = remainder % to;
        }
        while (prompt.length > 1 && prompt[prompt.length-1] == 0)
            prompt.pop();
        if (prompt.length == 0)
            prompt = [ 0 ];
        temporary += remainder.toString(to);
    }

    return [...temporary].reverse().join('');

}

export async function changeInputRadix()
{
    let b = ['Binary - base 2', 'Decimal - base 10', 'Hexadecimal - base 16'];
    
    switch (inputRadix) {
        case 2:
        case 10:
        case 16:
            break;
        default:
            break;
    }
    const result = await vscode.window.showQuickPick(b, {
        placeHolder: 'Change input radix'
    });

    if (result == 'Binary - base 2')
        inputRadix = 2;
    else if (result == 'Decimal - base 10')
        inputRadix = 10;
    else if (result == 'Hexadecimal - base 16')
        inputRadix = 16;
    else
        inputRadix = 10;

}

export async function changeOutputRadix()
{
    let b = ['Binary - base 2', 'Decimal - base 10', 'Hexadecimal - base 16'];
    
    switch (outputRadix) {
        case 2:
        case 10:
        case 16:
            break;
        default:
            break;
    }
    const result = await vscode.window.showQuickPick(b, {
        placeHolder: 'Change output radix'
    });

    if (result == 'Binary - base 2')
        outputRadix = 2;
    else if (result == 'Decimal - base 10')
        outputRadix = 10;
    else if (result == 'Hexadecimal - base 16')
        outputRadix = 16;
    else
        outputRadix = 10;

}

export async function howMuchIsIt(initial? : string)
{
    let clean = true;

    function promptIsValid(text: string) : string | null
    {
        // if prompt isnt modified, return
        if (text == initial && clean)
            return null;
        clean = false;

        for (const element of [...text])
        {
            let c = parseInt(element, inputRadix);
            if (isNaN(c) || c >= inputRadix) return `Invalid ${radixToString(inputRadix)} input`;
        }
        return null;
    }

    const prompt = await vscode.window.showInputBox({
        value: initial,
        prompt: `Convert ${radixToString(inputRadix)} to ${radixToString(outputRadix)}`,
        validateInput: promptIsValid
    });

    if (prompt == initial || prompt == undefined)
        return;

    const converted = convert(prompt, inputRadix, outputRadix);

    await howMuchIsIt(converted);
}


