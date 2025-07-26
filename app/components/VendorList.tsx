'use client';

import Link from 'next/link';
import { useAtom } from 'jotai';
import { vendorListAtom, vendorTotalAtom, vendorPageAtom } from '../atoms/vendorState';
import { useEffect } from 'react';

export default function VendorList() {
  const [vendors, setVendors] = useAtom(vendorListAtom);
  const [total, setTotal] = useAtom(vendorTotalAtom);
  const [page, setPage] = useAtom(vendorPageAtom);

  async function loadVendors(_page = 1) {
    const res = await fetch(`/api/vendors?page=${_page}`);
    const data = await res.json();
    setVendors(data.vendors);
    setTotal(data.total);
    setPage(_page);
  }
  useEffect(() => { loadVendors(page); }, [page]);

  async function handleDelete(id: string) {
    if (!confirm('Delete this vendor?')) return;
    await fetch(`/api/vendors/${id}`, { method: "DELETE" });
    loadVendors(page);
  }

  return (
    <div>
      <h2>Vendors</h2>
      <Link href="/vendors/create"><button>Create Vendor</button></Link>
      <table border={1} cellPadding={4}>
        <thead>
          <tr>
            <th>Name</th><th>Bank Acc.</th><th>Bank Name</th><th>Edit</th><th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map(v => (
            <tr key={v._id}>
              <td>{v.vendorName}</td>
              <td>{v.bankAccountNo}</td>
              <td>{v.bankName}</td>
              <td><Link href={`/vendors/edit/${v._id}`}>Edit</Link></td>
              <td><button onClick={() => handleDelete(v._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 16 }}>
        {Array.from({ length: Math.ceil(total / 5) }).map((_, i) =>
          <button key={i} disabled={i + 1 === page} onClick={() => loadVendors(i + 1)}>{i + 1}</button>
        )}
      </div>
    </div>
  );
}
