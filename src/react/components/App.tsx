import BottomBar from "./BottomBar";
import Game from "./Game";
import Header from "./Header";
import Modal from "./Modal";
import ModalProvider from "./ModalProvider";

export default function App() {
  return (
    <ModalProvider>
      <Header />
      <Game />
      <BottomBar />
      <Modal />
    </ModalProvider>
  );
}
