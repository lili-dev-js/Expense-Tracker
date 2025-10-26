import {
  Table,
  Button,
  HStack,
  Box,
  Text,
  Spinner,
  Center,
} from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface IHeaders<T> {
  name: string;
  key: keyof T;
}

export type TableProps<T> = {
  headers: IHeaders<T>[];
  isFetching?: boolean;
  data: T[] | unknown;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
  };
};

const DefaultTable = <T extends Record<string, string | ReactNode>>({
  headers,
  data,
  pagination,
  isFetching,
}: TableProps<T>) => {
  const totalPages = pagination
    ? Math.ceil(pagination.total / pagination.limit)
    : 1;

  if (isFetching) {
    return (
      <Center w="100%" my={16}>
        <Spinner height="100px" width="100px" />
      </Center>
    );
  }

  if (data && Array.isArray(data) && !data[0]) {
    return (
      <Center w="100%" my={16} fontSize='35px' fontWeight={600} color='gray.500'>
        This table is empty :)
      </Center>
    );
  }

  return (
    <Box
      color="gray.600"
      overflowX="auto"
      borderWidth="1px"
      borderRadius="lg"
      w="100%"
    >
      {data && Array.isArray(data) ? (
        <Table.Root size="md">
          <Table.Header>
            <Table.Row bgColor="gray.100">
              {headers.map((column, idx) => (
                <Table.ColumnHeader key={idx} color="gray.600">
                  {column.name}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((row, rowIndex) => (
              <Table.Row key={rowIndex} bgColor="gray.100">
                {headers.map((column, colIndex) => {
                  const thisCell = row[column.key];
                  if (thisCell && typeof thisCell === 'object') {
                    return (
                      <Table.Cell key={row.id || colIndex}>
                        {thisCell}
                      </Table.Cell>
                    );
                  }

                  return (
                    <Table.Cell
                      key={row.id || colIndex}
                    >{`${thisCell}`}</Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      ) : (
        <Box>load</Box>
      )}

      {pagination && (
        <HStack justify="space-between" mt={4}>
          <Button
            onClick={() => pagination.onPageChange(pagination.page - 1)}
            disabled={pagination.page <= 1}
          >
            Previous
          </Button>

          <Text>
            Page {pagination.page} of {totalPages}
          </Text>

          <Button
            onClick={() => pagination.onPageChange(pagination.page + 1)}
            disabled={pagination.page >= totalPages}
          >
            Next
          </Button>
        </HStack>
      )}
    </Box>
  );
};

export default DefaultTable;
