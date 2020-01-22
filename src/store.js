import create from "zustand";

const [useAlcoholStore] = create((set, get) => ({
  largeBeer: localStorage.getItem("largeBeer")
    ? parseInt(localStorage.getItem("largeBeer"))
    : 0,
  smallBeer: localStorage.getItem("smallBeer")
    ? parseInt(localStorage.getItem("smallBeer"))
    : 0,
  wine: localStorage.getItem("wine")
    ? parseInt(localStorage.getItem("wine"))
    : 0,
  spirits: localStorage.getItem("spirits")
    ? parseInt(localStorage.getItem("spirits"))
    : 0,
  increaseLargeBeer: () => {
    localStorage.setItem("largeBeer", get().largeBeer + 1);
    set(state => ({ largeBeer: state.largeBeer + 1 }));
  },
  increaseSmallBeer: () => {
    localStorage.setItem("smallBeer", get().smallBeer + 1);
    set(state => ({ smallBeer: state.smallBeer + 1 }));
  },
  increaseWine: () => {
    localStorage.setItem("wine", get().wine + 1);
    set(state => ({ wine: state.wine + 1 }));
  },
  increaseSpirits: () => {
    localStorage.setItem("spirits", get().spirits + 1);
    set(state => ({ spirits: state.spirits + 1 }));
  },
  decreaseLargeBeer: () => {
    localStorage.setItem("largeBeer", get().largeBeer - 1);
    set(state => ({ largeBeer: state.largeBeer - 1 }));
  },
  decreaseSmallBeer: () => {
    localStorage.setItem("smallBeer", get().smallBeer - 1);
    set(state => ({ smallBeer: state.smallBeer - 1 }));
  },
  decreaseWine: () => {
    localStorage.setItem("wine", get().wine - 1);
    set(state => ({ wine: state.wine - 1 }));
  },
  decreaseSpirits: () => {
    localStorage.setItem("spirits", get().spirits - 1);
    set(state => ({ spirits: state.spirits - 1 }));
  },

  resetLargeBeer: () => {
    localStorage.setItem("largeBeer", 0);
    set({ largeBeer: 0 });
  },
  resetSmallBeer: () => {
    localStorage.setItem("smallBeer", 0);
    set({ smallBeer: 0 });
  },
  resetWine: () => {
    localStorage.setItem("wine", 0);
    set({ wine: 0 });
  },
  resetSpirits: () => {
    localStorage.setItem("spirits", 0);
    set({ spirits: 0 });
  }
}));

export default useAlcoholStore;
