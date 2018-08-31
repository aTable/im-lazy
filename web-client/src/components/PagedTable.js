import React, { Component } from 'react'
import { decorate, observable, action } from 'mobx'
import { PropTypes as MobxPropTypes, observer } from 'mobx-react'
import PropTypes from 'prop-types'

/* 
example usages

    renderRecord(record) {
        return (
            <tr key={record.id}>
                <td>{record.name}</td>
            </tr>
        )
    }

    renderHeadings() {
        return (
            <tr>
                <th>Name</th>
            </tr>
        )
    }

    pageChange(pageNum) {
        // fetch your lazy loaded data here
    }

#1 lazy loading the page records
note that this example updates this.items to be the current shown page each time 
the page is changed
    <PagedTable
        tableClassName="table-responsive"
        isLoading={this.isFetchingData}
        isLazyLoaded={true}
        pageSize={this.pageSize}
        items={this.items}
        total={this.total}
        renderRecord={this.renderRecord.bind(this)}
        renderHeadings={this.renderHeadings.bind(this)}
        pageChange={this.pageChange.bind(this)}
    />

#2 ALL records retrieved then we render the entire list in the paged table
note that the total provided is records length
    <PagedTable
        tableClassName="table-responsive"
        isLoading={this.isFetchingData}
        isLazyLoaded={false}
        pageSize={10}
        items={this.items}
        total={this.items.length}
        renderRecord={this.renderRecord.bind(this)}
        renderHeadings={this.renderHeadings.bind(this)}
        pageChange={this.pageChange.bind(this)}
    />

*/
class PagedTable extends Component {
    static propTypes = {
        tableClassName: PropTypes.string,
        isLoading: PropTypes.bool,

        searchFilter: PropTypes.func,

        isLazyLoaded: PropTypes.bool.isRequired,
        pageSize: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        items: MobxPropTypes.observableArray,
        pageChange: PropTypes.func,
        renderRecord: PropTypes.func.isRequired,
        renderHeadings: PropTypes.func.isRequired,
        renderFooter: PropTypes.func,
    }

    currentPageNum = 1
    filterText = ''
    setPageNum(num) {
        this.currentPageNum = num
    }

    get numOfPages() {
        return Math.ceil(this.props.total / this.props.pageSize)
    }

    bubblePageChangeEvent() {
        if (this.props.pageChange) {
            this.props.pageChange(this.currentPageNum)
        }
    }

    goPreviousPage(e) {
        if (this.isCurrentPageAtMin()) return
        this.setPageNum(this.currentPageNum - 1)
        this.bubblePageChangeEvent()
    }

    goNextPage(e) {
        if (this.isCurrentPageAtMax()) return
        this.setPageNum(this.currentPageNum + 1)
        this.bubblePageChangeEvent()
    }

    isCurrentPageAtMin() {
        return this.currentPageNum === 1
    }

    isCurrentPageAtMax() {
        return this.currentPageNum >= this.numOfPages
    }

    goToPage(pageNumber) {
        this.setPageNum(pageNumber)
        this.bubblePageChangeEvent()
    }

    renderRecords() {
        if (this.props.isLazyLoaded) return this.props.items.map(this.props.renderRecord)

        const skip = (this.currentPageNum - 1) * this.props.pageSize
        const records = this.props.items.slice(skip, skip + this.props.pageSize).map(this.props.renderRecord)

        return records
    }

    renderPageNumbers() {
        let output = []
        for (let i = 0; i < this.numOfPages; i++) {
            output.push(
                <li
                    key={i}
                    className={`page-item ${this.currentPageNum === i + 1 ? 'active' : ''}`}
                    onClick={this.goToPage.bind(this, i + 1)}
                >
                    <button className="page-link" type="button">
                        {i + 1} {this.currentPageNum === i + 1 ? <span className="sr-only">(current)</span> : ''}
                    </button>
                </li>
            )
        }
        return output
    }

    render() {
        const heading = this.props.renderHeadings()
        const pageNumbers = this.renderPageNumbers()

        const loadingSpinner = this.props.isLoading && (
            <div style={{ position: 'absolute', top: '45%', left: '50%', zIndex: 100 }}>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw" />
                <span className="sr-only">Loading...</span>
            </div>
        )

        return (
            <div style={{ position: 'relative' }}>
                {loadingSpinner}

                <table
                    className={`table paged-table ${this.props.tableClassName}`}
                    style={{ opacity: this.props.isLoading ? 0.6 : 1 }}
                >
                    <thead>{heading}</thead>
                    <tbody>{this.renderRecords()}</tbody>
                    <tfoot>
                        {this.props.renderFooter && this.props.renderFooter()}
                        <tr>
                            <td colSpan={heading.props.children.length}>
                                <ul className="pagination justify-content-end">
                                    <li
                                        onClick={this.goToPage.bind(this, 1)}
                                        className={`page-item ${this.isCurrentPageAtMin() ? 'disabled' : ''}`}
                                    >
                                        <button className="page-link" type="button" tabIndex="-1">
                                            {'<<'}
                                        </button>
                                    </li>
                                    <li
                                        onClick={this.goPreviousPage.bind(this)}
                                        className={`page-item ${this.isCurrentPageAtMin() ? 'disabled' : ''}`}
                                    >
                                        <button className="page-link" type="button" tabIndex="-1">
                                            {'<'}
                                        </button>
                                    </li>
                                    {pageNumbers}
                                    <li
                                        onClick={this.goNextPage.bind(this)}
                                        className={`page-item ${this.isCurrentPageAtMax() ? 'disabled' : ''}`}
                                    >
                                        <button className="page-link" type="button">
                                            {'>'}
                                        </button>
                                    </li>
                                    <li
                                        onClick={this.goToPage.bind(this, this.numOfPages)}
                                        className={`page-item ${this.isCurrentPageAtMax() ? 'disabled' : ''}`}
                                    >
                                        <button className="page-link" type="button">
                                            {'>>'}
                                        </button>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        )
    }
}

decorate(PagedTable, {
    currentPageNum: observable,
    filterText: observable,
    setPageNum: action,
})

export default observer(PagedTable)
