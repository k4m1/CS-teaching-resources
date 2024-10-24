import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const LogicGateExplorer = () => {
  const [selectedGates, setSelectedGates] = useState(['NAND']);
  const [showIntermediates, setShowIntermediates] = useState(false);

  // Basic gate operations
  const gates = {
    NAND: (a, b) => !(a && b),
    NOT: (a) => !a,
    AND: (a, b) => a && b,
    OR: (a, b) => a || b,
    XOR: (a, b) => (a || b) && !(a && b),
  };

  // Calculate intermediate and final results
  const calculateResults = (a, b) => {
    const results = {};
    
    if (selectedGates.includes('NAND')) {
      results.NAND = gates.NAND(a, b);
    }
    if (selectedGates.includes('NOT')) {
      results.NOT_A = gates.NOT(a);
      results.NOT_B = gates.NOT(b);
    }
    if (selectedGates.includes('AND')) {
      results.AND = gates.AND(a, b);
    }
    if (selectedGates.includes('OR')) {
      results.OR = gates.OR(a, b);
    }
    if (selectedGates.includes('XOR')) {
      results.XOR = gates.XOR(a, b);
    }
    
    return results;
  };

  // Toggle gate selection
  const toggleGate = (gate) => {
    setSelectedGates(prev => 
      prev.includes(gate) 
        ? prev.filter(g => g !== gate)
        : [...prev, gate]
    );
  };

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Logic Gate Truth Table Explorer</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {Object.keys(gates).map(gate => (
              <Button
                key={gate}
                onClick={() => toggleGate(gate)}
                variant={selectedGates.includes(gate) ? "default" : "outline"}
                className="min-w-20"
              >
                {gate}
              </Button>
            ))}
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border">A</th>
                  <th className="p-2 border">B</th>
                  {selectedGates.map(gate => (
                    <th key={gate} className="p-2 border">{gate}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  [0, 0],
                  [0, 1],
                  [1, 0],
                  [1, 1]
                ].map(([a, b]) => (
                  <tr key={`${a}-${b}`}>
                    <td className="p-2 border text-center">{a}</td>
                    <td className="p-2 border text-center">{b}</td>
                    {selectedGates.map(gate => (
                      <td key={gate} className="p-2 border text-center">
                        {calculateResults(Boolean(a), Boolean(b))[gate] ? 1 : 0}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 text-sm">
            <p>Tips:</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Click gates to show/hide their truth tables</li>
              <li>NAND is universal - try building other gates using only NAND!</li>
              <li>Notice patterns between input combinations</li>
              <li>Compare OR vs XOR to see how they differ</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LogicGateExplorer;
