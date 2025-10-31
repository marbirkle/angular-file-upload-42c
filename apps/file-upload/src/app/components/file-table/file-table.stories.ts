import type { Meta, StoryObj } from '@storybook/angular';
import { FileTable, FileRow } from './file-table';

const meta: Meta<FileTable> = {
  title: 'Components/FileTable',
  component: FileTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<FileTable>;

/**
 * Sample data for stories
 */
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

/**
 * Basic display with a single valid file
 */
export const SingleValidFile: Story = {
  args: {
    rows: [sampleValidRow],
  },
};

/**
 * Basic display with a single invalid file
 */
export const SingleInvalidFile: Story = {
  args: {
    rows: [sampleInvalidRow],
  },
};

/**
 * Mixed valid and invalid files
 */
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

/**
 * Empty state
 */
export const EmptyList: Story = {
  args: {
    rows: [],
  },
};
