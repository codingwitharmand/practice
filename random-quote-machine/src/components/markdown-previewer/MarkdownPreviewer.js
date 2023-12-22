import { Component } from "react";
import "./MarkdownPreviewer.css";
import ReactMarkdown from "react-markdown";
import DOMPurify from "dompurify";
import remarkGfm from "remark-gfm";

class MarkdownPreviewer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			inputText: `# Welcome to my React Markdown Previewer!
## This is a sub-heading...
### And here's some other cool stuff:
Heres an [example link](http://www.google.com).
Here's some example code:
\`\`\`
// This is an example of code block with syntax highlighting.
const helloWorld = () => {
    console.log("Hello World!");
};
\`\`\`
* Lists
* [ ] todo
* [x] done
> Block Quotes!
You can also make text **bold**... whoa!

![Simple image](https://postimg.cc/nXXVjcT5)
`,
			outputHTML: null,
		};
		this.handleChange = this.handleChange.bind(this);
		this.parseMarkdownToHTML = this.parseMarkdownToHTML.bind(this);
	}

	componentDidMount() {
		const parseText = this.parseMarkdownToHTML(this.state.inputText);
		this.setState({ outerWidth: parseText });
	}

	handleChange(event) {
		this.setState({
			inputText: event.target.value,
		});
		this.parseMarkdownToHTML(event.target.value);
	}

	parseMarkdownToHTML(markdownText) {
		const html = DOMPurify.sanitize(markdownText);
		this.setState({ outputHTML: markdownText });
	}

	render() {
		const { inputText, outputHTML } = this.state;

		return (
			<div className="markdown-previewer">
				<div className="editor-wrapper">
					<h2>Editor</h2>
					<textarea
						id="editor"
						className="editor"
						value={this.state.inputText}
						onChange={this.handleChange}
					/>
				</div>
				<div id="preview">
					<h2>Previewer</h2>
					<div className="markdown-preview">
						<ReactMarkdown remarkPlugins={[remarkGfm]}>
							{this.state.outputHTML}
						</ReactMarkdown>
					</div>
				</div>
			</div>
		);
	}
}

export default MarkdownPreviewer;
