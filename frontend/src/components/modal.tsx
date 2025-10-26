import { Button, Dialog, Portal } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface IProps {
  setOpen: (open: boolean) => void;
  open: boolean;
  tittle: string;
  tittleButtonOpen?: string;
  children: ReactNode;
}

export const Modal = ({
  setOpen,
  open,
  tittle,
  tittleButtonOpen,
  children,
}: IProps) => {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={({ open }: { open: boolean }) => setOpen(open)}
    >
      <Dialog.Trigger asChild>
        {tittleButtonOpen && (
          <Button colorPalette="green" color="gray.50" size="sm">
            {tittleButtonOpen}
          </Button>
        )}
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title color="gray.600">{tittle}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
