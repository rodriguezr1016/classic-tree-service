'use client';

import * as React from 'react';
import { useEdgeStore } from "../../lib/edgestore"

export default function Page() {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();

  return (
    <div>
      
    </div>
  );
}