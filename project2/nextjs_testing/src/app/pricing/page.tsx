"use client";

import React, { useState, useEffect } from 'react';

export default function PricingPage() {
    const [products, setProducts] = useState<any[]>([]);
    const [coefficients, setCoefficients] = useState<Record<string, number>>({});
    const [prices, setPrices] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            setLoading(true);
            try {
                const [prodRes, coeffRes, priceRes] = await Promise.all([
                    fetch('/api/pricing/products'),
                    fetch('/api/pricing/coefficients'),
                    fetch('/api/pricing/calculate/all'),
                ]);
                const [prodData, coeffData, priceData] = await Promise.all([
                    prodRes.json(),
                    coeffRes.json(),
                    priceRes.json(),
                ]);
                setProducts(prodData.products || []);
                setCoefficients(coeffData.coefficients || {});
                setPrices(priceData.prices || []);
            } catch (e) {
                console.error('Failed to load pricing data', e);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, []);

    return (
        <div className="min-h-screen bg-gray-950 text-white p-8">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold mb-2 tracking-tight">价格管理</h1>
                <p className="text-white/40 text-sm mb-8">产品成本 × 系数 = 最终定价</p>

                {loading ? (
                    <div className="text-white/30 animate-pulse text-sm tracking-widest uppercase">
                        Loading...
                    </div>
                ) : (
                    <div className="space-y-8">
                        {/* 系数面板 */}
                        <section>
                            <h2 className="text-sm font-medium text-white/40 tracking-widest uppercase mb-3">
                                全局系数
                            </h2>
                            {Object.keys(coefficients).length === 0 ? (
                                <p className="text-white/20 text-sm">暂无系数配置</p>
                            ) : (
                                <div className="flex flex-wrap gap-3">
                                    {Object.entries(coefficients).map(([key, val]) => (
                                        <div key={key} className="bg-white/5 border border-white/10 rounded-lg px-4 py-2">
                                            <span className="text-white/50 text-xs">{key}</span>
                                            <span className="ml-2 text-white font-mono">{val}×</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* 价格表 */}
                        <section>
                            <h2 className="text-sm font-medium text-white/40 tracking-widest uppercase mb-3">
                                产品定价 ({prices.length})
                            </h2>
                            {prices.length === 0 ? (
                                <p className="text-white/20 text-sm">暂无产品数据，等待财务数据导入</p>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-sm">
                                        <thead>
                                            <tr className="text-white/30 text-xs tracking-widest uppercase border-b border-white/10">
                                                <th className="text-left py-2 pr-4">产品</th>
                                                <th className="text-left py-2 pr-4">分类</th>
                                                <th className="text-right py-2 pr-4">成本</th>
                                                <th className="text-right py-2">定价</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {prices.map((p) => (
                                                <tr key={p.product_id} className="hover:bg-white/5 transition-colors">
                                                    <td className="py-3 pr-4 font-medium">{p.product_name}</td>
                                                    <td className="py-3 pr-4 text-white/40">{p.category || '—'}</td>
                                                    <td className="py-3 pr-4 text-right font-mono text-white/50">{p.cost}</td>
                                                    <td className="py-3 text-right font-mono text-green-400">{p.final_price}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </section>
                    </div>
                )}
            </div>
        </div>
    );
}
