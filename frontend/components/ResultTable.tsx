interface ResultTableProps {
  result: any;
}

export default function ResultTable({
  result,
}: ResultTableProps) {
  if (!result || result.parsedRecords.length === 0) {
    return null;
  }

  return (
    <div className="mt-10">

      <h2 className="text-2xl font-bold mb-4">
        Import Summary
      </h2>

      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-blue-100 p-4 rounded-lg">
          <p className="font-bold">Total Records</p>
          <p>{result.totalRecords}</p>
        </div>

        <div className="bg-green-100 p-4 rounded-lg">
          <p className="font-bold">Imported</p>
          <p>{result.totalImported}</p>
        </div>

        <div className="bg-red-100 p-4 rounded-lg">
          <p className="font-bold">Skipped</p>
          <p>{result.totalSkipped}</p>
        </div>

      </div>

      <div className="overflow-auto border rounded-lg max-h-[450px]">

        <table className="min-w-full border-collapse">

          <thead className="sticky top-0 bg-gray-200">

            <tr>

              {Object.keys(result.parsedRecords[0]).map((header) => (
                <th
                  key={header}
                  className="border px-4 py-2 text-left whitespace-nowrap"
                >
                  {header}
                </th>
              ))}

            </tr>

          </thead>

          <tbody>

            {result.parsedRecords.map(
              (row: any, index: number) => (
                <tr key={index}>

                  {Object.keys(row).map((key) => (
                    <td
                      key={key}
                      className="border px-4 py-2 whitespace-nowrap"
                    >
                      {String(row[key] ?? "")}
                    </td>
                  ))}

                </tr>
              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}