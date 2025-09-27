/* eslint-disable react/prop-types */
import classNames from "classnames";
import { BiError } from "react-icons/bi";
import {
  useState,
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import styles from "./styles.module.css";
import { HiOutlinePrinter } from "react-icons/hi";
import { Divider, Label } from "davis-components";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { BiFullscreen, BiExitFullscreen } from "react-icons/bi";
import { printThis } from "@/utils/print/printThis";

export const TextEditor = forwardRef(
  (
    {
      questionKey,
      useFormContext,
      validation,
      label,
      disabled,
      labelClassName,
      divider,
      userGuide,
      educationalContent,
      archive,
      labelMore,
      dividerClassName,
      containerClassName,
      wrapperClassName,
      editorClassName,
      toolbarClassName,
    },
    ref
  ) => {
    const toolbarColors = [
      "rgb(97,189,109)",
      "rgb(26,188,156)",
      "rgb(84,172,210)",
      "rgb(44,130,201)",
      "rgb(147,101,184)",
      "rgb(71,85,119)",
      "rgb(204,204,204)",
      "rgb(65,168,95)",
      "rgb(0,168,133)",
      "rgb(61,142,185)",
      "rgb(41,105,176)",
      "rgb(85,57,130)",
      "rgb(40,50,78)",
      "rgb(0,0,0)",
      "rgb(247,218,100)",
      "rgb(251,160,38)",
      "rgb(235,107,86)",
      "rgb(226,80,65)",
      "rgb(163,143,132)",
      "rgb(239,239,239)",
      "rgb(255,255,255)",
      "rgb(250,197,28)",
      "rgb(243,121,52)",
      "rgb(209,72,65)",
      "rgb(184,49,47)",
      "rgb(124,112,107)",
      "rgb(209,213,216)",
    ];

    const {
      watch,
      setValue,
      register,
      formState: { errors },
    } = useFormContext();

    const [editorState, setEditorState] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const EditorRef = useRef(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    // ابزارهای draft-js اینجا نگه‌داری میشن
    const editorUtils = useRef({});

    const handleAppendText = (value) => {
      if (!editorState || !editorUtils.current.Modifier) return;

      const { Modifier, EditorState } = editorUtils.current;
      const contentState = editorState.getCurrentContent();
      const selection = editorState.getSelection();

      const endKey = contentState.getLastBlock().getKey();
      const endLength = contentState.getLastBlock().getLength();

      const newSelection = selection.merge({
        anchorKey: endKey,
        anchorOffset: endLength,
        focusKey: endKey,
        focusOffset: endLength,
        isBackward: false,
      });

      const newContentState = Modifier.insertText(
        contentState,
        newSelection,
        value
      );

      const newEditorState = EditorState.push(
        editorState,
        newContentState,
        "insert-characters"
      );

      setEditorState(newEditorState);

      const html = editorUtils.current.stateToHTML(newContentState);
      setValue(questionKey, html, { shouldValidate: true });
    };

    const clear = () => {
      if (!editorUtils.current.EditorState) return;
      setEditorState(editorUtils.current.EditorState.createEmpty());
      setValue(questionKey, "", { shouldValidate: true });
    };

    useEffect(() => {
      register(questionKey, validation);

      const loadEditorLibraries = async () => {
        try {
          const [
            { Editor },
            {
              EditorState,
              convertToRaw,
              Modifier,
              ContentState,
              convertFromRaw,
            },
            htmlToDraftModule,
            { stateToHTML },
          ] = await Promise.all([
            import("react-draft-wysiwyg"),
            import("draft-js"),
            import("html-to-draftjs"),
            import("draft-js-export-html"),
          ]);

          EditorRef.current = Editor;
          const htmlToDraft = htmlToDraftModule.default;

          // ذخیره ابزارها در ref
          editorUtils.current = {
            stateToHTML,
            convertToRaw,
            Modifier,
            EditorState,
            ContentState,
            convertFromRaw,
            htmlToDraft,
          };

          // مقدار اولیه
          const value = watch(questionKey);
          let initEditorState = EditorState.createEmpty();

          if (value) {
            try {
              const parsed = JSON.parse(value);
              if (parsed.blocks) {
                initEditorState = EditorState.createWithContent(
                  convertFromRaw(parsed)
                );
              }
            } catch (err) {
              const blocksFromHTML = htmlToDraft(value);
              if (blocksFromHTML) {
                const contentState = ContentState.createFromBlockArray(
                  blocksFromHTML.contentBlocks,
                  blocksFromHTML.entityMap
                );
                initEditorState = EditorState.createWithContent(contentState);
              }
            }
          }

          setEditorState(initEditorState);
          setIsLoading(false);
        } catch (error) {
          console.error("Failed to load editor libraries:", error);
        }
      };

      loadEditorLibraries();
    }, [register, questionKey, validation, watch]);

    useEffect(() => {
      const onChange = () => {
        const active = document.fullscreenElement === containerRef.current;
        setIsFullscreen(active);
        document.body.style.overflow = active ? "hidden" : "";
      };
      document.addEventListener("fullscreenchange", onChange);
      return () => document.removeEventListener("fullscreenchange", onChange);
    }, []);

    useImperativeHandle(ref, () => ({
      appendText: handleAppendText,
      clear,
    }));

    const handleEditorChange = (newState) => {
      setEditorState(newState);
      const contentState = newState.getCurrentContent();

      const html = editorUtils.current.stateToHTML(contentState, {
        inlineStyleFn: (styles) => {
          const colorStyle = styles.find((style) =>
            style.startsWith("color-rgb")
          );
          const fontSizeStyle = styles.find((style) =>
            style.startsWith("fontsize-")
          );

          const styleObject = {};
          if (colorStyle) styleObject.color = colorStyle.replace("color-", "");
          if (fontSizeStyle)
            styleObject.fontSize =
              fontSizeStyle.replace("fontsize-", "") + "px";

          return Object.keys(styleObject).length
            ? { style: styleObject }
            : null;
        },
        blockStyleFn: (block) => {
          const alignment = block.getData()?.get("text-align");
          if (alignment) return { style: { textAlign: alignment } };
        },
      });

      setValue(questionKey, html, { shouldValidate: true });
    };

    // styleMap اصلاح‌شده
    const styleMap = toolbarColors.reduce((styles, color) => {
      styles[`COLOR_${color}`] = { color };
      return styles;
    }, {});

    const error = errors?.[questionKey]?.message || null;

    const labelDirectionStyle = {
      center: "label-center",
      right: "label-right",
      left: "label-left",
    };

    if (isLoading) {
      return <div className="text-center py-4">Loading editor...</div>;
    }

    const Editor = EditorRef.current;

    const Print = () => (
      <div
        className="rdw-link-wrapper"
        aria-label="rdw-link-control"
        onClick={() => {
          const content = watch(questionKey);
          if (content) printThis("", content);
        }}
      >
        <div className="rdw-option-wrapper" title="print">
          <HiOutlinePrinter className="xs:text-sm lg:text-xl" />
        </div>
      </div>
    );

    const enterFullscreen = async () => {
      if (!containerRef.current) return;
      try {
        await containerRef.current.requestFullscreen({ navigationUI: "hide" });
      } catch (e) {
        // fallback: if fullscreen API blocked, do nothing special
      }
    };

    const exitFullscreen = async () => {
      try {
        if (document.fullscreenElement) await document.exitFullscreen();
      } catch (e) {
        console.warn("Failed to exit fullscreen:", e);
      }
    };

    const FullsizeToggle = () => (
      <div
        className="rdw-link-wrapper"
        aria-label="rdw-link-control"
        onClick={() => (isFullscreen ? exitFullscreen() : enterFullscreen())}
      >
        <div
          className="rdw-option-wrapper"
          title={isFullscreen ? "minimize" : "fullsize"}
        >
          {isFullscreen ? (
            <BiExitFullscreen className="xs:text-sm lg:text-xl" />
          ) : (
            <BiFullscreen className="xs:text-sm lg:text-xl" />
          )}
        </div>
      </div>
    );

    return (
      <div
        ref={containerRef}
        className={classNames(
          "w-full flex flex-col relative bg-formItem p-2 rounded",
          containerClassName,
          error ? "field-error" : "",
          isFullscreen ? styles.fullscreen : ""
        )}
        style={{ boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.15)" }}
      >
        {label && (
          <Label
            className={classNames(labelClassName, labelDirectionStyle[divider])}
            userGuide={userGuide}
            educationalContent={educationalContent}
            archive={archive ? { ...archive, questionKey } : false}
            label={label}
            required={validation?.required || null}
            more={labelMore}
            disabled={disabled}
          />
        )}

        {divider && (
          <Divider
            className={classNames(dividerClassName)}
            position={divider}
          />
        )}

        <Editor
          toolbar={{
            options: [
              "inline",
              "blockType",
              "fontSize",
              "list",
              "textAlign",
              "colorPicker",
              "link",
              "emoji",
              "image",
              "remove",
              "history",
            ],
            textAlign: {
              inDropdown: false,
              options: ["left", "center", "right", "justify"],
            },
          }}
          editorState={editorState}
          toolbarClassName={styles.toolbar + " " + toolbarClassName}
          wrapperClassName={classNames(
            styles.wrapper,
            wrapperClassName,
            isFullscreen ? styles.wrapperFull : ""
          )}
          editorClassName={classNames(
            styles.editor,
            editorClassName,
            "prose min-w-full",
            isFullscreen ? "h-full" : ""
          )}
          onEditorStateChange={handleEditorChange}
          readOnly={disabled}
          toolbarCustomButtons={[
            <Print key="print" />,
            <FullsizeToggle key="fullsize-toggle" />,
          ]}
          customStyleMap={styleMap}
        />

        {error && (
          <span className="error">
            <BiError className="text-xs lg:text-base" />
            {error}
          </span>
        )}
      </div>
    );
  }
);

TextEditor.displayName = "TextEditor";
