import React from 'react';
import styled from 'styled-components';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

const mdParser = new MarkdownIt();

const Markdown = ({ text }: { text: string }) => {
	return (
		<StyledView dangerouslySetInnerHTML={{ __html: mdParser.render(text) }} />
	)
}

export const MarkdownEditor = ({ text, onChange, className, style }: { text: string, className?: string, style?: React.CSSProperties, onChange: (text: string) => void }) => {
	return (
		<StyledView>
			<MdEditor className={className} view={{ menu: true, md: true, html: false }} style={{ minHeight: 100, ...style }} value={text} renderHTML={text => mdParser.render(text)} onChange={v => onChange(v.text)} />
		</StyledView>
	)
}

const StyledView = styled.div`
  line-height: 1.5;
	h1, h2, h3, h4, h5, h6 {
		margin-top: 0;
		margin-bottom: 0;
		line-height: 1.5;
	}
	h1 {
		font-size: 24px;
	}
	h2 {
		font-size: 20px;
	}
	h3 {
		font-size: 18px;
	}
	h4 {
		font-size: 16px;
	}
	p {
		margin-top: 0;
		margin-bottom: 0;
	}
	ol {
		padding-left: 1.5em !important;
		margin-top: 0.5em !important;
		margin-bottom: 0.5em !important;
	}
	pre {
		padding: 0;
	}
	code {
		line-height: 1;
	}
	section {
		padding: 0;
	}
	.rc-md-editor {
		background-color: white;
		border: 1px solid #e2e8f0;
		color: #212B36;
		border-radius: 8px;
		overflow: hidden;
		&.full {
			z-index: 99999;
		}
		.drop-wrap {
			background-color: #f8fafc;
			border-color: #e2e8f0;
			border-radius: 8px;
			.list-item {
				color: #212B36;
				&:hover {
					background-color: #f1f5f9;
				}
			}
		}
		.rc-md-navigation {
			background-color: #f8fafc;
			border: none;
			padding: 7px 5px;
			.navigation-nav {
				color: #212B36;
			}
			.button-wrap {
				gap: 2px;
				.button {
					color: #212B36;
					background-color: #f1f5f9;
					border-radius: 8px;
					padding: 6px 8px;
					height: 36px !important;
					width: 36px !important;
					margin: 0 !important;
					&:hover {
						color: #637381;
					}
				}
				.button:not(.button-type-fullscreen) {
					display: flex !important;
					align-items: center;
					justify-content: center;
				}
			}
		}
		.editor-container {
			section {
				background-color: white;
			}
			>.section {
				border: none;
			}
			.input {
				background: white;
				color: #212B36;
			}
			.custom-html-style {
				color: #212B36;
			}
		}
	}
	a {
		color: #212B36;
	}
	blockquote {
		color: #212B36;
		border-left: 6px solid #637381;
		background: none repeat scroll 0 0 #f7f8f9;
		padding: 5px 8px 5px 30px;
		position: relative;
		margin: 16px 0;
	}
	pre, code {
		background-color: #f7f8f9;
	}
	table {
		border: 1px solid #e2e8f0;
		border-collapse: collapse;
		border-spacing: 0;
		box-sizing: border-box;
		tr {
			border: 1px solid #e2e8f0;
			th, td {
				background-color: transparent;
				border: 1px solid #e2e8f0;
			}
			th {
				font-weight: 700;
				padding: 10px 6px;
				word-break: break-word;
			}
			td {
				padding: 10px 15px;
				min-width: 60px;
				word-break: break-word;
			}
		}
		tbody {

		}
	}
	.button-type-fullscreen {
		display: none !important;
	}
`;

export default Markdown;