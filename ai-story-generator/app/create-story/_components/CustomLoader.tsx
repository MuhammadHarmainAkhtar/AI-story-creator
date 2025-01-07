import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Image from "next/image";
const CustomLoader = ({ loading }: any) => {
  useEffect(() => {
    onOpen();
  }, []);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div>
      {loading && (
        <Modal
          isDismissable={false}
          isKeyboardDismissDisabled={true}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalBody className="p-5 flex justify-center items-center text-center">
                  <Image
                    src={"/magic-hat.gif"}
                    alt="loader"
                    width={900}
                    height={900}
                  />
                  <h1 className="text-2xl font-bold text-[#7D40EF]">
                    Please wait, while we're generating your story...
                  </h1>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
};

export default CustomLoader;
