import { Component } from "react";
import "./MarkdownPreviewer.css";
import { marked } from "marked";

class MarkdownPreviewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markdown: `
# H1 Heading
## H2 Heading
[Visit MDN Web Docs](https://developer.mozilla.org/)
Inline code: \`console.log('Hello World!')\`
\`\`\`javascript
console.log('Hello World!');
\`\`\`
- List item 1
- List item 2

> Blockquote

![Image of Yaktocat](https://octodex.github.com/images/yaktocat.png)

**Bolded Text**
`
    };
  }

  handleChange = (e) => {
    this.setState({ markdown: e.target.value });
  };

  render() {
    return (
      <div className="markdown-previewer">
        <div className="editor-wrapper">
          <h3>Editor</h3>
          <textarea
            id="editor"
            className="editor"
            value={this.state.markdown}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <h2>Previewer</h2>
          <div 
			id="preview" 
			className="markdown-preview"
			dangerouslySetInnerHTML={{ __html: marked(this.state.markdown.replace(/\n/g, '<br>'), { sanitize: true }) }}
		  >
		  </div>
        </div>
      </div>
    );
  }
}

export default MarkdownPreviewer;
