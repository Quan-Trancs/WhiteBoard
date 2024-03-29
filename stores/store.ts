import { defineStore, createPinia } from 'pinia';

const pinia = createPinia();

export const useToolStore = defineStore({
    id: "tools-store",
    state: () => ({
        color: '#000000',
        shape: 'pencil',
        size: 5,
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