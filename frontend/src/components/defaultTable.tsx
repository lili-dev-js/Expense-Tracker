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
import { IUsePaginationResponse } from '../types';

interface IHeaders<T> {
  name: string;
  key: keyof T;
}

export type TableProps<T> = {
  headers: IHeaders<T>[];
  isFetching?: boolean;
  data: T[] | unknown;
  pagination?: IUsePaginationResponse;
};

const DefaultTable = <T extends Record<string, string | ReactNode>>({
  headers,
  data,
  pagination,
  isFetching,
}: TableProps<T>) => {
  if (isFetching) {
    return (
      <Center w="100%" my={16}>
        <Spinner height="100px" width="100px" />
      </Center>
    );
  }

  if (data && Array.isArray(data) && !data[0]) {
    return (
      <Center
        w="100%"
        my={16}
        fontSize="35px"
        fontWeight={600}
        color="gray.500"
      >
        This table is empty :)
      </Center>
    );
  }

  return (
    <>
      {' '}
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
      </Box>
      <Center w="100%">
        {pagination && (
          <HStack justify="space-between" mt={4}>
            <Button
              w="100px"
              onClick={() => pagination.prevPage()}
              disabled={pagination.currentPage <= 1}
              colorPalette="green"
            >
              Previous
            </Button>

            <Text>
              Page {pagination.currentPage} of {pagination.totalPages}
            </Text>

            <Button
              w="100px"
              colorPalette="green"
              onClick={() => pagination.nextPage()}
              disabled={pagination.currentPage >= pagination.totalPages}
            >
              Next
            </Button>
          </HStack>
        )}
      </Center>
    </>
  );
};

export default DefaultTable;
