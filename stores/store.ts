import { defineStore, createPinia } from 'pinia';

const pinia = createPinia();

export const useToolStore = defineStore({
    id: "tools-store",
    state: () => ({
        color: '#FF0000',
        shape: 'pencil',
        size: 5,
        font: 'Times New Roman',
        bold: false,
        italic: false,
        underline: false,
    }),

    actions: {
        setColor(color: string) {
            this.color = color;
          },
          setShape(shape: string) {
            this.shape = shape;
          },
          setSize(size: number) {
            this.size = size;
          },
          setFont(font: string) {
            this.font = font;
          },
          setFontStyleBold(value: boolean) {
            this.bold = value;
          },
          setFontStyleItalic(value: boolean) {
            this.italic = value;
          },
          setFontStyleUnderline(value: boolean) {
            this.underline = value;
          }
    }
});

export const useBoardStore = defineStore({
  id: "board-store",
  state: () => ({
      isDrawing: false,
  }),

  actions: {
      setDrawing(state: boolean) {
          this.isDrawing = state;
        },
  }
});
export {pinia};