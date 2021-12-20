import React from 'react'
import {
    Table,
    TableHead,
    TableCell,
    TableBody,
    IconButton,
    Icon,
    TableRow,
} from '@material-ui/core'

const subscribarList = [
    {
        name: 'abc xyZ',
        date: '18 january, 2019',
        permiss: 'admin',
        status: 'active',
        email: 'congtran@gmail.com',
    },
    {
        name: 'tran van ab',
        date: '10 january, 2019',
        permiss: 'employee',
        status: 'active',
        email: 'kkkkkkkkkkk@gmail.com',
    },
    // {
    //     name: 'james cassegne',
    //     date: '8 january, 2019',
    //     amount: 5000,
    //     status: 'close',
    //     company: 'Collboy Tech LTD.',
    // },
    // {
    //     name: 'lucy brown',
    //     date: '1 january, 2019',
    //     amount: 89000,
    //     status: 'open',
    //     company: 'ABC Fintech LTD.',
    // },
    // {
    //     name: 'lucy brown',
    //     date: '1 january, 2019',
    //     amount: 89000,
    //     status: 'open',
    //     company: 'ABC Fintech LTD.',
    // },
    // {
    //     name: 'lucy brown',
    //     date: '1 january, 2019',
    //     amount: 89000,
    //     status: 'open',
    //     company: 'ABC Fintech LTD.',
    // },
]

const SimpleTable = () => {
    return (
        <div className="w-full overflow-auto">
            <Table className="whitespace-pre">
                <TableHead>
                    <TableRow>
                        <TableCell className="px-0">Tên</TableCell>
                        <TableCell className="px-0">Email</TableCell>
                        <TableCell className="px-0">Trạng thái</TableCell>
                        <TableCell className="px-0">Quyền</TableCell>
                        <TableCell className="px-0">Thao tác</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subscribarList.map((subscriber, index) => (
                        <TableRow key={index}>
                            <TableCell className="px-0 capitalize" align="left">
                                {subscriber.name}
                            </TableCell>
                            <TableCell className="px-0 capitalize" align="left">
                                {subscriber.email}
                            </TableCell>
                            <TableCell className="px-0 capitalize">
                                {subscriber.status}
                            </TableCell>
                            <TableCell className="px-0 capitalize">
                                {subscriber.permiss}
                            </TableCell>
                            <TableCell className="px-0">
                                <IconButton>
                                    <Icon color="primary" className="m-0 text-100">edit</Icon>
                                </IconButton>
                                <IconButton>
                                    <Icon color="primary" className="m-0 text-100">delete</Icon>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default SimpleTable
