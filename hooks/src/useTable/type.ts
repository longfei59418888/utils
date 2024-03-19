export type AsyncAction<R, P = undefined | Array<unknown>> = P extends undefined
  ? () => Promise<R>
  : P extends Array<unknown>
    ? (...params: P) => Promise<R>
    : (params: P) => Promise<R>

// export type Action<R, P = undefined | Array<unknown>> = P extends undefined
//   ? () => R
//   : P extends Array<unknown>
//     ? (...params: P) => R
//     : (params: P) => R

// export type Actions<R, P = undefined | Array<unknown>> =
//   | AsyncAction<R, P>
//   | Action<R, P>

// export enum EmptyImages {
//   DEFAULT = 'DEFAULT',
// }

// export enum TablePropsOptions {
//   DELETE = 'DELETE',
//   VIEW = 'VIEW',
//   EDIT = 'EDIT',
// }

// export interface TablePropsOption<RecordType> {
//   type?: TablePropsOptions
//   label?: string
//   handle?: AsyncAction<unknown, RecordType>
//   filter?: Action<boolean | undefined, RecordType>
//   api?: string
// }

// export interface TableProps<RecordType extends AnyObject>
//   extends Table<RecordType> {
//   pagination?: Omit<TablePaginationConfig, 'onChange'>
//   rowSelectionType?: RowSelectionType | undefined
//   emptyImage?: EmptyImages | string
//   options?: TablePropsOption<RecordType>[]
//   refresh?: AsyncAction<void, [undefined | Omit<Pagination, 'total'>]>
// }

// export type TableElement = <RecordType extends AnyObject>(
//   params: TableProps<RecordType>,
// ) => ReactElement

export interface BaseOptionType {
  disabled?: boolean
  label: string
  value: unknown
  [name: string]: unknown
}

export enum FilterItemType {
  INPUT = 'INPUT',
  SELECT = 'SELECT',
  DATE_DAY = 'DATE_DAY',
  DATE_RANGE = 'DATE_RANGE',
}

// export interface FilterItemProps {
//   label: string
//   type: FilterItemType
//   name: string
//   rules?: Rule[]
//   tooltip?: LabelTooltipType
// }

// export type FilterInputProps = Omit<InputProps, 'name' | 'type'> &
//   FilterItemProps
// export type FilterDateProps = DatePickerProps & FilterItemProps
// export type FilterDateRangeProps = RangePickerProps & FilterItemProps
//
// export interface FilterSelectProps<ValueType = unknown>
//   extends SelectProps<ValueType, BaseOptionType>,
//     FilterItemProps {
//   options: BaseOptionType[]
// }

// export type TableFilterItem =
//   | FilterInputProps
//   | FilterSelectProps<unknown>
//   | FilterDateProps
//   | FilterDateRangeProps

// export interface TableFilterProps<FilterValue extends AnyObject> {
//   items: TableFilterItem[]
//   initialValues?: FilterValue
//   onChange?: (values: FilterValue) => void
//   onSearch?: (values: FilterValue) => void
//   onClear?: (values?: FilterValue) => void
//   searchText?: string
//   clearText?: string
// }

export interface UseTableParams<R, P> {
  fetchData?: AsyncAction<PageReturn<R>, P>
  query?: P
}

export interface Pagination {
  pageSize: number
  total: number
  current: number
}

export interface PageReturn<D> extends Pagination {
  data: D[]
}

export type QueryPagination = Pick<Pagination, 'pageSize' | 'current'>

// export default TableElement
