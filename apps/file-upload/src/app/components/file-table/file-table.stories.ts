import type { Meta, StoryObj } from '@storybook/angular';
import { FileTable } from './file-table';
import { FileRow } from '@models/file.models';
import { provideMockStore } from '@ngrx/store/testing';

const meta: Meta<FileTable> = {
  title: 'Components/FileTable',
  component: FileTable,
  decorators: [
    story => {
      const originalStory = story();
      return {
        ...originalStory,
        moduleMetadata: {
          providers: [
            provideMockStore({
              initialState: {
                files: {
                  items: [
                    {
                      fileName: 'sample-42c-marbirkle.json',
                      title: 'Sample Valid File',
                      description: 'This is a valid JSON file',
                      valid: true,
                      content: '{"test": "data"}',
                    },
                  ],
                },
              },
            }),
          ],
        },
      };
    },
  ],
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    rows: {
      control: 'object',
      description: 'Array of file rows to display',
    },
  },
};

export default meta;
type Story = StoryObj<FileTable>;

const sampleValidRow: FileRow = {
  fileName: 'valid-42c-marbirkle.json',
  title: 'Valid JSON File',
  description: 'This file contains valid JSON structure',
  valid: true,
};

const sampleInvalidRow: FileRow = {
  fileName: 'invalid-42c-marbirkle.json',
  title: 'Invalid JSON File',
  description: 'This file has malformed JSON',
  valid: false,
};

export const SingleValidFile: Story = {
  args: {
    rows: [sampleValidRow],
  },
};

export const SingleInvalidFile: Story = {
  args: {
    rows: [sampleInvalidRow],
  },
};

export const MultipleFiles: Story = {
  args: {
    rows: [
      sampleValidRow,
      sampleInvalidRow,
      {
        fileName: 'another-42c-marbirkle.json',
        title: 'Another Valid File',
        description: 'More JSON data',
        valid: true,
      },
    ],
  },
};

export const EmptyList: Story = {
  args: {
    rows: [],
  },
};

export const ManyFiles: Story = {
  args: {
    rows: Array.from({ length: 10 }, (_, i) => ({
      fileName: `file-${i}-42c-marbirkle.json`,
      title: `File ${i}`,
      description: `Description for file ${i}`,
      valid: i % 2 === 0,
    })),
  },
};
