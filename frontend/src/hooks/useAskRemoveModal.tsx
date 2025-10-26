import { Modal } from '../components/modal';
import { Button, Flex } from '@chakra-ui/react';
import { useState } from 'react';

interface IProps<T> {
  nameItem: string;
  reload: () => void;
  remove: (itemToRemove:T) => Promise<T>;
}

export const useAskRemoveModal = <T extends Record<'_id', string>>({
  nameItem,
  reload,
  remove,
}: IProps<T>) => {
  const [itemToRemove, setItemToRemove] = useState<T>();
  const isOpen = !!itemToRemove;

  const handleDeleteItem = (item: T) => {
    setItemToRemove(item);
  };

  const onClose = () => {
    setItemToRemove(undefined);
  };

  const handleConfirmDelete = async () => {
    if(itemToRemove){
      const response = await remove(itemToRemove);
      if(response){
        reload();
        setItemToRemove(undefined);
      }
    }
  };

  const AskRemoveModal = () => (
    <Modal
      tittle={`Delete ${nameItem}`}
      open={isOpen}
      setOpen={(open) => !isOpen && onClose()}
    >
      Are you sure you want to remove this {nameItem}?
      <Flex justifyContent="flex-end" mt={4}>
        <Button variant="outline" colorPalette="red" mr={4} onClick={onClose}>
          Cancel
        </Button>
        <Button
          type="submit"
          colorPalette="red"
          color="gray.50"
          onClick={handleConfirmDelete}
        >
          Confirm
        </Button>
      </Flex>
    </Modal>
  );

  return { handleDeleteItem, AskRemoveModal };
};
