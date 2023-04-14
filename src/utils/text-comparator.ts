export async function compareText(
    text1: string,
    text2: string
): Promise<number[]> {
    let diff = [];
    const txtLength = Math.min(text1.length, text2.length);

    for (let i = 0; i < txtLength; i++) {
        if (text1[i] !== text2[i]) {
            diff.push(i + 1);
        }
    }

    const maxLength = Math.max(text1.length, text2.length);
    for (let i = txtLength; i < maxLength; i++) diff.push(i + 1);

    return diff;
}
