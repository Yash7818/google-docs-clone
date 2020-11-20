import React, { useCallback, useMemo, useState } from 'react'
import isHotkey from 'is-hotkey'
import { Editable, withReact,Slate, useSlate } from 'slate-react'
import { Text, Editor, Transforms, createEditor } from 'slate'
import { withHistory } from 'slate-history'
import initialValue from "./initialValue"
import {Button, Icon, Toolbar} from "./editorComp"
import {css} from "@emotion/css"

const IMPKEYS = {
  'mod+b': 'bold',
  'mod+i': 'italic',
  'mod+u': 'underline',
  'mod+`': 'code',
}

const LIST_TYPES = ['numbered-list', 'bulleted-list']

const DocEditor = () => {
  const [value, setValue] = useState(initialValue)
  const [search, setSearch] = useState("");
  const [font, setFont] = useState("");
  //console.log(font);
  const renderElement = useCallback(props =>  <Element {...props} font={font} />, [font])
  const renderLeaf = useCallback(props => <Leaf {...props} />, [])
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  const decorate = useCallback(
    ([node,path]) => {
      const ranges = [] 
      if(search && Text.isText(node)) {
        const {text} = node
        const sections = text.split(search)
        let offset = 0
        sections.forEach((part,i) => {
          if(i !== 0) {
            ranges.push({
              anchor: {path, offset: offset - search.length},
              focus: {path, offset},
              highlight: true
            })
            console.log(part,i, offset);
          }
          offset = offset + part.length + search.length
        })
      } 
      return ranges
    },
    [search]
  )

  return (
    <Slate editor={editor} value={value} onChange={value => setValue(value)}>
      <Toolbar>
        <MarkButton format="bold" icon="format_bold" />
        <MarkButton format="italic" icon="format_italic" />
        <MarkButton format="underline" icon="format_underlined" />
        <MarkButton format="code" icon="code" />
        <BlockButton format="heading-one" icon="looks_one" />
        <BlockButton format="heading-two" icon="looks_two" />
        <BlockButton format="heading-three" icon="looks_3" />
        <BlockButton format="heading-four" icon="looks_4" />
        <BlockButton format="heading-five" icon="looks_5" />
        <BlockButton format="heading-six" icon="looks_6" />
        <BlockButton format="block-quote" icon="format_quote" />
        <BlockButton format="numbered-list" icon="format_list_numbered" />
        <BlockButton format="bulleted-list" icon="format_list_bulleted" />
        <div
          className={css`
            position: relative;
          `}
        >
          <Icon
            className={css`
              position: absolute;
              top: 0.25em;
              left: 0.3em;
              color: #ccc;
            `}
          >
            search
          </Icon>
          <form onSubmit={(e) => {
            e.preventDefault()
          }}>
          <input
            type="search"
            placeholder="Search the text..."
            onChange={e => {
              console.log(e.target.value);
              setSearch(e.target.value)
            }}
            className={css`
              padding-left: 2em;
              padding-top: 5px;
              padding-bottom: 5px;
              width: 100%;
            `}
          />
          </form>
        </div>
        <select onChange={(e) => {
          console.log(e.target.value)
          setFont(e.target.value);
        }}
        className={css`
        padding-left: 2em;
        padding-top: 5px;
        padding-bottom: 5px;
        `}>
          <option value="Arial" className={css`font-family: Arial`}>Arial</option>
          <option value="Verdana" className={css`font-family: Verdana`}>Verdana</option>
          <option value="Times New Roman" className={css`font-family: Times New Roman`}>Times New Roman</option>
          <option value="Arial Black" className={css`font-family: Arial Black`}>Arial Black</option>
          <option value="Comic Sans MS" className={css`font-family: Comic Sans MS`}>Comic Sans MS</option>
          <option value="Courier New" className={css`font-family: Courier New`}>Courier New</option>
          <option value="Times" className={css`font-family: Times`}>Times</option>
          <option value="Calibri" className={css`font-family: Arial`}>Calibri</option>
        </select>
        </Toolbar>
      <Editable
        renderElement={renderElement}
        renderLeaf={renderLeaf}
        decorate={decorate}
        placeholder="Enter some rich text…"
        spellCheck
        autoFocus
        onKeyDown={event => {
          for (const impkey in IMPKEYS) {
            if (isHotkey(impkey, event)) {
              event.preventDefault()
              const mark = IMPKEYS[impkey]
              toggleMark(editor, mark)
            }
          }
        }}
      />
    </Slate>
  )
}

const toggleBlock = (editor, format) => {
  const isActive = isBlockActive(editor, format)
  const isList = LIST_TYPES.includes(format)

  Transforms.unwrapNodes(editor, {
    match: n => LIST_TYPES.includes(n.type),
    split: true,
  })

  Transforms.setNodes(editor, {
    type: isActive ? 'paragraph' : isList ? 'list-item' : format,
  })

  if (!isActive && isList) {
    const block = { type: format, children: [] }
    Transforms.wrapNodes(editor, block)
  }
}

const toggleMark = (editor, format) => {
  const isActive = isMarkActive(editor, format)

  if (isActive) {
    Editor.removeMark(editor, format)
  } else {
    Editor.addMark(editor, format, true)
  }
}

const isBlockActive = (editor, format) => {
  const [match] = Editor.nodes(editor, {
    match: n => n.type === format,
  })

  return match
}

const isMarkActive = (editor, format) => {
  const marks = Editor.marks(editor)
  return marks ? marks[format] === true : false
}
const Element = ({ font, attributes, children, element}) => {
  //console.log(attributes, font)
  switch (element.type) {
    case 'block-quote':
      return <blockquote {...attributes} className={css`font-family: ${font}`}>{children}</blockquote>
    case 'bulleted-list':
      return <ul {...attributes} className={css`font-family: ${font}`}>{children}</ul>
    case 'heading-one':
      return <h1 {...attributes} className={css`font-family: ${font}`}>{children}</h1>
    case 'heading-two':
      return <h2 {...attributes} className={css`font-family: ${font}`}>{children}</h2>
    case 'heading-three':
      return <h3 {...attributes} className={css`font-family: ${font}`}>{children}</h3>
    case 'heading-four':
      return <h4 {...attributes} className={css`font-family: ${font}`}>{children}</h4>
    case 'heading-five':
      return <h5 {...attributes} className={css`font-family: ${font}`}>{children}</h5>
    case 'heading-six':
      return <h6 {...attributes} className={css`font-family: ${font}`}>{children}</h6>
    case 'list-item':
      return <li {...attributes} className={css`font-family: ${font}`}>{children}</li>
    case 'numbered-list':
      return <ol {...attributes} className={css`font-family: ${font}`}>{children}</ol>
    default:
      return <p {...attributes} className={css`font-family: ${font}`}>{children}</p>
  }
}
const Leaf = ({ attributes, children, leaf }) => {
  if (leaf.bold) {
    children = <strong>{children}</strong>
  }

  if (leaf.code) {
    children = <code>{children}</code>
  }

  if (leaf.italic) {
    children = <em>{children}</em>
  }

  if (leaf.underline) {
    children = <u>{children}</u>
  }
  
  return (
    <span
      {...attributes}
      className={css`
        font-weight: ${leaf.bold && 'bold'};
        background-color: ${leaf.highlight && '#ffeeba'};
      `}
    >
      {children}
    </span>
  )
}

const BlockButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isBlockActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleBlock(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}

const MarkButton = ({ format, icon }) => {
  const editor = useSlate()
  return (
    <Button
      active={isMarkActive(editor, format)}
      onMouseDown={event => {
        event.preventDefault()
        toggleMark(editor, format)
      }}
    >
      <Icon>{icon}</Icon>
    </Button>
  )
}
export default DocEditor;
