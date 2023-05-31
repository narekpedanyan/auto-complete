import React from 'react';
import {render, screen, act} from '@testing-library/react';
import AutoComplete from './AutoComplete';

describe('Autocomplete component', () => {
    test('Renders initial autocomplete components with given props', () => {
        const onProcessSearchMock = jest.fn(() => undefined);
        const onChangeMock = jest.fn(() => undefined);
        const placeholderText = 'Placeholder text';
        const isLoading = false;
        render(
            <AutoComplete
                onProcessSearch={onProcessSearchMock}
                loading={isLoading}
                placeholder={placeholderText}
                options={[]}
                fieldName="fieldName"
                onChange={onChangeMock}
                value=""
            />
        );
        const inputEl = screen.getByPlaceholderText(placeholderText);
        expect(inputEl).toBeInTheDocument();
    });

    test('Renders clear button and given value as value of autocomplete input without matching options', () => {
        const onProcessSearchMock = jest.fn(() => undefined);
        const onChangeMock = jest.fn(() => undefined);
        const placeholderText = 'Placeholder text';
        const isLoading = false;
        const value = 'John Smith';
        render(
            <AutoComplete
                onProcessSearch={onProcessSearchMock}
                loading={isLoading}
                placeholder={placeholderText}
                options={[]}
                fieldName="fieldName"
                onChange={onChangeMock}
                value={value}
            />
        );
        const inputEl = screen.getByDisplayValue(value);
        const closeBtn = screen.getByTestId('clear');
        expect(inputEl).toBeInTheDocument();
        expect(closeBtn).toBeInTheDocument();
    });

    test('Renders clear button and given value as value of autocomplete input with matching options', () => {
        const onProcessSearchMock = jest.fn(() => undefined);
        const onChangeMock = jest.fn(() => undefined);
        const placeholderText = 'Placeholder text';
        const isLoading = false;
        const value = 'an';
        const mockOptions = [
            { name: 'Anthony Chaves' },
            { name: 'Logan' },
            { name: 'Dylan' },
            { name: 'Christian' },
            { name: 'Lillian' },
            { name: 'Savannah' },
        ];
        render(
            <AutoComplete
                onProcessSearch={onProcessSearchMock}
                loading={isLoading}
                placeholder={placeholderText}
                options={mockOptions}
                fieldName="fieldName"
                onChange={onChangeMock}
                value={value}
            />
        );
        const inputEl = screen.getByDisplayValue(value);
        act(() => {
            inputEl.focus();
        });
        const closeBtn = screen.getByTestId('clear');
        expect(inputEl).toBeInTheDocument();
        expect(closeBtn).toBeInTheDocument();
        const options = screen.getAllByTestId('option');
        expect(options).toHaveLength(6);
    });
});
