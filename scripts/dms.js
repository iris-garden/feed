/*
 * consider the text suggestions on an iPhone, where there are three options.
 * that is the basis for this dialogue system; there will only ever be three
 * options for how to respond to a given prompt. these options may introduce
 * new branches to the dialogue, causing the next prompt to vary based on the
 * user's input. individual prompts may be reused by providing their ids, but  
 * note that this system does not provide automatic cycle detection, so it is
 * possible for incautious use of this feature to trap the user in an endless
 * loop. splitting the text of a prompt or response over multiple messages is
 * supported in the UI via the use of the `/` character. to include a literal
 * `/`, use `\/`. the special id `END` is reserved and represents the end of
 * the conversation (the prompt associated with this key in the tree will be
 * displayed, and no new responses will be displayed). the special id `START`
 * is reserved and used as the starting node for the dialogue tree if no other
 * node is given to `startDialogue`.
 */

/*
 * TODO yaml format
 * TODO specify typing speed/animation
 * TODO expand this into conversation with player's mother designed to make ppl
 *      realize u can simply not respond if u don't want to lol, like absolutely
 *      nothing plot-critical should live here
 */

export const START = "START"
export const END = "END"
export const USER = "USER"
export const example = {
  [START]: [
    "Hello there!",
    [
      ["hi back", "howAreYou"],
      ["hi, miss u", "missYouToo"],
      ["heyyyyyy", "howAreYou"]
    ]
  ],
  howAreYou: [
    "How are you doing sweetie? Your father and I worry about you, you know.",
    [
      ["i'm fine", END],
      ["i'm okay", END],
      ["how do u think lol", END]
    ]
  ],
  missYouToo: [
    "I miss you too! We'll see you at Christmas, right?",
    [
      ["right", END],
      ["ahhhh fuck i need to get my plane tickets still", END],
      ["yes! i haven't gotten my tickets yet tho", END]
    ]
  ],
  [END]: ["*SYSTEM: Janine is offline.*", null],
}

export const getNode = (tree, node) => tree[node]

export const getElementArrayByClassName = (className) => [...document.getElementsByClassName(className)]

export const responseClass = "response"
export const responsesClass = "responses"
export const responseTextClass = "response-text"
export const oldResponseClass = "old-response"
export const oldResponseTextClass = "old-response-text"
export const clearResponses = (responseId) => {
  getElementArrayByClassName(responseClass).forEach(element => {
    if (element.id === responseId) {
      element.className = oldResponseClass
      element.firstChild.className = oldResponseTextClass
    } else {
      element.remove()
    }
  })
}

// TODO general purpose reusable strings file
export const div = "div"
export const p = "p"

export const promptClass = "prompt"
export const writePrompt = (conversationEle, prompt) => {
  const promptDiv = document.createElement(div)
  promptDiv.className = promptClass
  promptDiv.innerHTML = `<p class="prompt-text">${prompt}</p>`
  conversationEle.appendChild(promptDiv)
}

export const writeResponses = (conversationEle, node, tree, responses) => {
  const responsesDiv = document.createElement(div)
  responsesDiv.className = responsesClass
  conversationEle.appendChild(responsesDiv)
  responses.forEach(([response, next], index) => {
    const responseId = `${node}-${index}`
    const responseDiv = document.createElement(div)
    responseDiv.id = responseId
    responseDiv.className = responseClass
    const responseText = document.createElement(p)
    responseText.className = responseTextClass
    responseText.innerHTML = response
    responseText.addEventListener("click", () => {
      clearResponses(responseId)
      display(tree, next)
    })
    responseDiv.appendChild(responseText)
    responsesDiv.appendChild(responseDiv)
  })
}

export const conversation = "conversation"
// TODO make custom elements
export const display = (tree, node = START) => {
  const conversationEle = document.getElementById(conversation)
  const [prompt, responses] = getNode(tree, node)
  writePrompt(conversationEle, prompt)
  if (node !== END) {
    writeResponses(conversationEle, node, tree, responses)
  }
}

display(example)
